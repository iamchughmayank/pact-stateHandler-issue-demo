import fetch from 'node-fetch';

export const getClientById = async ( url, id ) => {
	let response = await fetch( `${ url }/clients/${ id }` );
	if ( response.ok ) {
        response = await response.json();
		return response;
	}
	return response;
};
