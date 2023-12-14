import { registerBlockType } from '@wordpress/blocks';

import './index.css';

import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
} );


