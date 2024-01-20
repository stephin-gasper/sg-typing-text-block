/**
 * WordPress dependencies
 */
import { TextControl, MenuGroup, MenuItem } from '@wordpress/components';
import { insertBefore, insertAfter } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CustomDropdown from './CustomDropdown';

/**
 * Show options through dropdownmenu for additional settings in toolbar.
 * Display options like adding prefix & suffix text.
 *
 * @param {Object}   props               Props object.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {Object}   props.popoverProps  Popover component props
 *
 * @return {import('react').ReactElement} Element to render.
 */
export default function AdditionalOptionsMenu( {
	popoverProps,
	attributes,
	setAttributes,
} ) {
	return (
		<MenuGroup>
			<CustomDropdown
				popoverProps={ popoverProps }
				content={
					<TextControl
						value={ attributes.prefix }
						onChange={ ( prefix ) => setAttributes( { prefix } ) }
					/>
				}
				headerTitle={ __( 'Prefix Text', 'sg-typing-text-block' ) }
				toggleProps={ {
					as: MenuItem,
					icon: insertBefore,
					children: __( 'Prefix text', 'sg-typing-text-block' ),
					iconPosition: 'left',
				} }
			/>
			<CustomDropdown
				popoverProps={ popoverProps }
				content={
					<TextControl
						value={ attributes.suffix }
						onChange={ ( suffix ) => setAttributes( { suffix } ) }
					/>
				}
				headerTitle={ __( 'Suffix Text', 'sg-typing-text-block' ) }
				toggleProps={ {
					as: MenuItem,
					icon: insertAfter,
					children: __( 'Suffix text', 'sg-typing-text-block' ),
					iconPosition: 'left',
				} }
			/>
		</MenuGroup>
	);
}
