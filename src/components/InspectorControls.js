import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';

/**
 * Add controls to settings sidebar
 *
 * @param {Object} props               - props object
 * @param {Object} props.attributes    - data stored by block
 * @param {Object} props.setAttributes - set data to be stored in block
 *
 * @return {Element} Element to render.
 */
const Controls = ( { attributes, setAttributes } ) => (
	<InspectorControls>
		<PanelBody title={ 'Settings' }>
			<RangeControl
				label={ __( 'Typing speed', 'sg-typing-text-block' ) }
				help={ __(
					'Select delay before each letter is typed',
					'sg-typing-text-block'
				) }
				value={ attributes.typeSpeed }
				onChange={ ( typeSpeed ) => setAttributes( { typeSpeed } ) }
				min={ 1 }
				max={ 1000 }
			/>

			<RangeControl
				label={ __( 'Delete speed', 'sg-typing-text-block' ) }
				help={ __(
					'Select delay before each letter is deleted',
					'sg-typing-text-block'
				) }
				value={ attributes.deleteSpeed }
				onChange={ ( deleteSpeed ) => setAttributes( { deleteSpeed } ) }
				min={ 1 }
				max={ 1000 }
			/>

			<RangeControl
				label={ __( 'Pause time', 'sg-typing-text-block' ) }
				help={ __(
					'Select pause time after typing animation is complete',
					'sg-typing-text-block'
				) }
				value={ attributes.pauseTime }
				onChange={ ( pauseTime ) => setAttributes( { pauseTime } ) }
				min={ 0 }
				step={ 100 }
				max={ 3000 }
			/>

			<ToggleControl
				label="Loop"
				help={ __(
					'Repeats the given sentences',
					'sg-typing-text-block'
				) }
				checked={ attributes.loop }
				onChange={ ( loop ) => setAttributes( { loop } ) }
			/>
		</PanelBody>
	</InspectorControls>
);

export default Controls;
