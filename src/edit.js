/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import useTypewriter from './useTypeWriter';
import InspectorControls from './components/InspectorControls';
import BlockControls from './components/block-controls';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Props object.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {import('react').ReactElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		prefix = '',
		strings,
		pauseTime,
		typeSpeed,
		deleteSpeed,
		loop,
		suffix = '',
	} = attributes;

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	const { typedText, isTypingPaused, continueLoop } = useTypewriter( {
		strings,
		pauseTime,
		typeSpeed,
		deleteSpeed,
		loop,
	} );

	return (
		<div { ...useBlockProps() }>
			<BlockControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				popoverAnchor={ popoverAnchor }
			/>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<p
				className="sg-typing-text-wrapper"
				ref={ setPopoverAnchor }
				aria-label={ `${ prefix }${ strings?.join(
					', '
				) }${ suffix }` }
			>
				<span aria-hidden="true">
					{ prefix }
					{ strings.length ? (
						<span className="sg-typing-text">
							{ typedText }
							<span
								className={ classNames(
									'sg-typing-text-cursor',
									{
										blink: isTypingPaused,
										hide: ! continueLoop,
									}
								) }
							>
								|
							</span>
						</span>
					) : null }
					{ suffix }
				</span>
			</p>
		</div>
	);
}
