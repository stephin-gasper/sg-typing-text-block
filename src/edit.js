/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import useTypewriter from './useTypeWriter';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const strings = [ 'String 1', 'String 2', 'String 3', 'String 4' ];
	const { typedText, isTypingPaused, continueLoop } = useTypewriter( {
		strings,
	} );

	return (
		<div { ...useBlockProps() }>
			<p className="sg-typing-text-wrapper">
				{ __( "I'm ", 'sg-typing-text-block' ) }
				<span className="sg-typing-text">
					{ typedText }
					<span
						aria-hidden="true"
						className={ classNames( 'sg-typing-text-cursor', {
							blink: isTypingPaused,
							hide: ! continueLoop,
						} ) }
					>
						|
					</span>
				</span>
			</p>
		</div>
	);
}
