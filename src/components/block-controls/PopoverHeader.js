/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Show header for popover
 *
 * @param {Object}   props         Props object.
 * @param {Function} props.onClose Callback function when popover is closed
 * @param {string}   props.title   Title to be displayed in header of popover
 *
 * @return {import('react').ReactElement} Element to render.
 */
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
