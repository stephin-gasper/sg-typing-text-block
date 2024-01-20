/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import { chevronDown, edit } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CustomDropdown from './CustomDropdown';
import AdditionalOptionsMenu from './AdditionalOptionsMenu';
import SortableRepeaterText from './SortableRepeaterText';

/**
 * Add controls to block toolbar
 *
 * @param {Object}   props               Props object.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {Element}  props.popoverAnchor Reference to anchor element.
 *
 * @return {import('react').ReactElement} Element to render.
 */
const Controls = ( { attributes, setAttributes, popoverAnchor } ) => {
	// Memoize popoverProps to avoid returning a new object every time.
	const popoverProps = useMemo(
		() => ( { anchor: popoverAnchor } ),
		[ popoverAnchor ]
	);

	const updateStrings = ( texts ) => {
		setAttributes( { strings: texts } );
	};

	const renderToolbarMenuContent = () => (
		<AdditionalOptionsMenu
			popoverProps={ popoverProps }
			attributes={ attributes }
			setAttributes={ setAttributes }
		/>
	);

	return (
		<BlockControls>
			<ToolbarGroup>
				<CustomDropdown
					popoverProps={ popoverProps }
					content={
						<SortableRepeaterText
							texts={ attributes.strings }
							updateTexts={ updateStrings }
						/>
					}
					headerTitle={ __( 'Texts', 'sg-typing-text-block' ) }
					toggleProps={ {
						as: ToolbarButton,
						icon: edit,
						title: __( 'Change texts', 'sg-typing-text-block' ),
					} }
				/>
				<ToolbarDropdownMenu
					label={ __( 'More', 'sg-typing-text-block' ) }
					icon={ chevronDown }
				>
					{ renderToolbarMenuContent }
				</ToolbarDropdownMenu>
			</ToolbarGroup>
		</BlockControls>
	);
};

export default Controls;
