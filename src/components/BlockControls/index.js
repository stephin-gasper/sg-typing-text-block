import { useMemo } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import {
	Dropdown,
	ToolbarGroup,
	ToolbarButton,
	TextareaControl,
	Button,
} from '@wordpress/components';
import { edit, closeSmall } from '@wordpress/icons';
import { DOWN } from '@wordpress/keycodes';
import { __ } from '@wordpress/i18n';

const PopoverHeader = ( { onClose, title } ) => {
	return (
		<div className="sgtt-popover-header">
			{ title ? (
				<h2 className="sgtt-popover-header__heading">{ title }</h2>
			) : null }
			<Button
				className="sgtt-popover-header__action"
				label={ __( 'Close', 'sg-typing-text-block' ) }
				icon={ closeSmall }
				onClick={ onClose }
			/>
		</div>
	);
};

const CustomDropdown = ( {
	popoverProps,
	content,
	headerTitle,
	toggleProps,
} ) => {
	const renderContent = ( { onClose } ) => (
		<>
			<PopoverHeader onClose={ onClose } title={ headerTitle } />
			{ content }
		</>
	);
	const renderToggle = ( { isOpen, onToggle } ) => {
		const openOnArrowDown = ( event ) => {
			if ( ! isOpen && event.keyCode === DOWN ) {
				event.preventDefault();
				onToggle();
			}
		};
		const { as: Toggle, children, ...restToggleProps } = toggleProps;
		return (
			<Toggle
				onClick={ () => {
					onToggle();
				} }
				onKeyDown={ openOnArrowDown }
				aria-haspopup="true"
				aria-expanded={ isOpen }
				{ ...restToggleProps }
			>
				{ children }
			</Toggle>
		);
	};
	return (
		<Dropdown
			contentClassName="sgtt-dropdown__content"
			popoverProps={ popoverProps }
			renderContent={ renderContent }
			renderToggle={ renderToggle }
		/>
	);
};

const Controls = ( { attributes, setAttributes, popoverAnchor } ) => {
	// Memoize popoverProps to avoid returning a new object every time.
	const popoverProps = useMemo(
		() => ( { anchor: popoverAnchor } ),
		[ popoverAnchor ]
	);

	return (
		<BlockControls>
			<ToolbarGroup>
				<CustomDropdown
					popoverProps={ popoverProps }
					content={
						<TextareaControl
							className="sgtt-textarea-control-wrapper"
							help={ __(
								'Text to animate',
								'sg-typing-text-block'
							) }
							value={ attributes.strings.join( ' | ' ) }
							onChange={ ( text ) =>
								setAttributes( {
									strings: text.split( ' | ' ),
								} )
							}
						/>
					}
					headerTitle={ __( 'Texts', 'sg-typing-text-block' ) }
					toggleProps={ {
						as: ToolbarButton,
						icon: edit,
						title: __( 'Change texts', 'sg-typing-text-block' ),
					} }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
};

export default Controls;
