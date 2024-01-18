import { TextControl, MenuGroup, MenuItem } from '@wordpress/components';
import { insertBefore } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import CustomDropdown from './CustomDropdown';

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
		</MenuGroup>
	);
}