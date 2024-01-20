import { forwardRef, useState } from '@wordpress/element';
import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	useSortable,
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { dragHandle, cancelCircleFilled, plus } from '@wordpress/icons';
import { v4 as uuidv4 } from 'uuid';
import { TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

/** @typedef {import('react').ForwardedRef<HTMLElement>} Ref */
/**
 * Item component.
 * Renders editable field which can be removed and dragged to change position
 *
 * @param {Object}   props            Component props.
 * @param {string}   props.value      Input field value
 * @param {boolean}  props.isActive   Indicate when element is dragged
 * @param {number}   props.index      Index position of element in array
 * @param {Function} props.setItem    Update value based on index
 * @param {Function} props.removeItem Remove element from array
 * @param {Object}   props.attributes Draggable attributes
 * @param {Object}   props.listeners  Draggable listeners
 * @param {Object}   props.style      Draggable styles
 * @param {Ref}      ref              The forwarded ref to the item element.
 *
 * @return {Element} Element to render.
 */
function UnforwardedItem(
	{
		value,
		isActive,
		index,
		setItem,
		removeItem,
		attributes,
		listeners,
		style,
	},
	ref
) {
	const onFieldChange = ( text ) => {
		setItem( text, index );
	};

	const onRemoveClick = () => {
		removeItem( index );
	};
	return (
		<div
			style={ style }
			ref={ ref }
			className={ classNames( 'sgtt-sortable-repeater-text-item', {
				active: isActive,
			} ) }
		>
			<Button
				icon={ dragHandle }
				className={ classNames(
					'sgtt-sortable-repeater-text-item__drag-handle',
					{
						active: isActive,
					}
				) }
				aria-hidden="true"
				label={ __( 'Drag', 'sg-typing-text-block' ) }
				// Should not be able to tab to drag handle as this
				// button can only be used with a pointer device.
				tabIndex="-1"
				draggable={ true }
				{ ...attributes }
				{ ...listeners }
			/>
			<TextControl
				className="sgtt-sortable-repeater-text-item__field"
				onChange={ onFieldChange }
				value={ value }
			/>

			<Button
				className="sgtt-sortable-repeater-text-item__delete"
				onClick={ onRemoveClick }
				icon={ cancelCircleFilled }
				isDestructive
				label={ __( 'Remove', 'sg-typing-text-block' ) }
			/>
		</div>
	);
}

const Item = forwardRef( UnforwardedItem );

Item.displayName = 'Item';

/** @typedef {{index: number, value:string, setItem: Function, removeItem: Function}} SortableItemRestProps */

/**
 * Sortable Item Component.
 * Add draggable functionality to Item component
 *
 * @param {Object}                props           Component props.
 * @param {string}                props.id        A string identifier for a repeater item.
 * @param {SortableItemRestProps} props.restProps Other props will be passed to wrapped component
 *
 * @return {import('react').ReactNode} React JSX
 */
function SortableItem( { id, ...restProps } ) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable( { id } );

	const style = {
		transform: CSS.Transform.toString( transform ),
		transition,
	};

	return (
		<Item
			ref={ setNodeRef }
			style={ style }
			attributes={ attributes }
			listeners={ listeners }
			isActive={ isDragging }
			{ ...restProps }
		/>
	);
}

/**
 * SortableRepeaterText is used to display list of editable texts which are draggable.
 *
 * @param {Object}   props             Component props.
 * @param {Array}    props.texts       List of texts.
 * @param {Function} props.updateTexts Function which updates texts stored in attributes.
 *
 * @return {Element} Element to render.
 */
function SortableRepeaterText( { texts, updateTexts: updateTextsProps } ) {
	const [ items, setItems ] = useState(
		texts.map( ( text ) => ( { id: uuidv4(), value: text } ) )
	);
	const sensors = useSensors(
		useSensor( PointerSensor ),
		useSensor( KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		} )
	);

	const updateTexts = ( elems ) => {
		setItems( elems );
		updateTextsProps( elems.map( ( elem ) => elem.value ) );
	};

	const handleDragEnd = ( event ) => {
		const { active, over } = event;

		if ( active.id !== over.id ) {
			const oldIndex = items.findIndex(
				( innerItem ) => innerItem.id === active.id
			);
			const newIndex = items.findIndex(
				( innerItem ) => innerItem.id === over.id
			);
			const modifiedItems = arrayMove( items, oldIndex, newIndex );
			updateTexts( modifiedItems );
		}
	};

	/**
	 * Return new instance with deep copy.
	 * [...values] does a shallow copy. To ensure deep-copy,
	 * we do JSON.parse(JSON.stringify()).
	 *
	 * @param {Array} values - array to deep copy
	 *
	 * @return {Array} - deep copy of array
	 */
	const deepCopy = ( values ) => JSON.parse( JSON.stringify( values ) );

	/**
	 * Adds a new repeater item.
	 */
	const addItem = () => {
		const itemsCopy = deepCopy( items );

		itemsCopy.push( {
			id: uuidv4(),
			value: `String ${ itemsCopy.length + 1 }`,
		} );

		updateTexts( itemsCopy );
	};

	/**
	 * Updates the item currently being edited.
	 *
	 * @param {string} newValue The value that should be used to updated the item.
	 * @param {number} index    The index at which the item should be updated.
	 */
	const setItem = ( newValue, index ) => {
		const itemsCopy = deepCopy( items );

		itemsCopy[ index ].value = newValue;

		updateTexts( itemsCopy );
	};

	/**
	 * Removes an item from the list.
	 *
	 * @param {number} index The index of the item that needs to be removed.
	 */
	const removeItem = ( index ) => {
		const itemsCopy = deepCopy( items ).filter(
			( item, innerIndex ) => index !== innerIndex
		);
		updateTexts( itemsCopy );
	};

	return (
		<div className="sgtt-sortable-repeater-text">
			<DndContext
				sensors={ sensors }
				collisionDetection={ closestCenter }
				onDragEnd={ handleDragEnd }
				modifiers={ [ restrictToParentElement ] }
			>
				<SortableContext
					items={ items }
					strategy={ verticalListSortingStrategy }
				>
					{ items.map( ( { id, value }, index ) => (
						<SortableItem
							key={ id }
							id={ id }
							index={ index }
							value={ value }
							setItem={ setItem }
							removeItem={ removeItem }
						/>
					) ) }
				</SortableContext>
			</DndContext>
			<div className="sgtt-sortable-repeater-text-appender">
				<Button
					variant="primary"
					icon={ plus }
					onClick={ addItem }
					className="sgtt-sortable-repeater-text-appender__action"
					label={ __( 'Add new text', 'sg-typing-text-block' ) }
				/>
			</div>
		</div>
	);
}

export default SortableRepeaterText;
