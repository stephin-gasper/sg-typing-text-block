import { useMemo } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	TextareaControl,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import { chevronDown, edit } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import CustomDropdown from './CustomDropdown';
import AdditionalOptionsMenu from './AdditionalOptionsMenu';

/**
 * Add controls to block toolbar
 *
 * @param {Object}  props               - props object
 * @param {Object}  props.attributes    - data stored by block
 * @param {Object}  props.setAttributes - set data to be stored in block
 * @param {Element} props.popoverAnchor - reference to anchor element
 *
 * @return {Element} Element to render.
 */
const Controls = ( { attributes, setAttributes, popoverAnchor } ) => {
	// Memoize popoverProps to avoid returning a new object every time.
	const popoverProps = useMemo(
		() => ( { anchor: popoverAnchor } ),
		[ popoverAnchor ]
	);

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
