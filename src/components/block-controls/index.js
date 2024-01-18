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
