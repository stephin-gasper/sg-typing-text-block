import { Button } from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

export default function PopoverHeader( { onClose, title } ) {
	return (
		<div className="sgtt-popover-header">
			<h2 className="sgtt-popover-header__heading">{ title }</h2>
			<Button
				className="sgtt-popover-header__action"
				label={ __( 'Close', 'sg-typing-text-block' ) }
				icon={ closeSmall }
				onClick={ onClose }
			/>
		</div>
	);
}
