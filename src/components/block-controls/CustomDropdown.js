import { Dropdown } from '@wordpress/components';
import { DOWN } from '@wordpress/keycodes';

import PopoverHeader from './PopoverHeader';

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
