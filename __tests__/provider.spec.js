
/**
 * External dependencies
 */
import {Verifier}  from '@pact-foundation/pact';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe( 'pact Verification', () => {
	let clientId;

	const baseOptions = {
		providerBaseUrl: 'http://localhost:3000',
		provider: 'ClientService',
		providerVersion: '1.0.0',
		log: path.resolve( process.cwd(), 'logs', 'pact.log' ),
		logLevel: 'DEBUG',
		pactUrls: [ path.resolve( __dirname, './SupportService-ClientService.json' ) ],
		stateHandlers: {
			'valid id': {
				setup: () => {
					clientId = '26';
					return Promise.resolve( 'client id set to 26' );
				},

			},
			// I have also tried without setup as follows:
			// 'valid id': () => {
			// 	clientId = '26';
			// 	return Promise.resolve( 'client id set to 26' );
			// },
		},
		requestFilter: ( req, res, next ) => {
			req.url = `/clients/${ clientId }`;
			req.method = 'GET';
			next();
		},
	};

	it( 'should validate the expectations of SupportService for fetching one client by id', () => {
		const verifier = new Verifier( baseOptions );
		return verifier.verifyProvider();
	} );
} );
