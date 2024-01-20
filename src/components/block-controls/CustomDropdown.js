/**
 * WordPress dependencies
 */
import { Dropdown } from '@wordpress/components';
import { DOWN } from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import PopoverHeader from './PopoverHeader';

/**
 * Common customized dropdown when trigger from toolbar
 *
 * @param {Object}                    props              Props object.
 * @param {Object}                    props.popoverProps Popover component props
 * @param {import('react').ReactNode} props.content      Content to displayed in popover
 * @param {string}                    props.headerTitle  Title displayed in popover
 * @param {Object}                    props.toggleProps  Props to be passed via toggleProps.as
 *
 * @return {import('react').ReactElement} Element to render.
 */
export default function CustomDropdown( {
	popoverProps,
	content,
	headerTitle,
	toggleProps,
} ) {
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
}
