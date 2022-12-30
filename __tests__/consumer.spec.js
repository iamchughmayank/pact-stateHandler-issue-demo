import { PactV3, MatchersV3 } from '@pact-foundation/pact';
const { fromProviderState } = MatchersV3;
const Like = MatchersV3.like;
import { getClientById } from '../consumer';
const provider = new PactV3( {
	consumer: 'SupportService',
	provider: 'ClientService',
	port: 4000,
	logLevel: 'INFO',
} );

describe('Client Service Contract tests', () => {

    let clientServiceResponse = {
        "result": 1,
        "status": "success",
        "data": [{
            "account_status": "test",
            "active": 1,
            "client_id": 24297,
            "client_name": "Rowe - Cummings",
            "created": "2017-07-14T16:32:29.000Z",
            "email_address": "Grover.McCullough@yahoo.com"
          }]
    };
    describe('get /clients/:id', () => {

        beforeAll(() => {
            provider
				.given( 'valid id' )
				.uponReceiving( 'a request to get client by id' )
				.withRequest( {
					method: 'GET',
					path: fromProviderState('${clientId}', 100),
				} )
				.willRespondWith( {
					status: 200,
					body: Like( clientServiceResponse ),
				} )
        } )
        it('should return correct data', () => provider.executeTest(async mockserver => {
            const response = await getClientById( mockserver.url, 100 );
			expect( response.data[ 0 ].active ).toBe( 1 );
        }));
    })
})