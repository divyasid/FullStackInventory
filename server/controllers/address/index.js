const addressSchema = require( './address.schema.json' );
const validate = require( '../../utils/validate' );
const { serialize, deserialize } = require( '../../utils/message-pack' );
const uuid = require( 'uuid' ).v4;

const redis = require( '../../singletons/redis' );
const ADDRESSES = 'addresses';

// eslint-disable-next-line
const log = console.log;

module.exports = {
  async add( address ) {
    const id = 'addr_' + uuid();

    log( 'creating', id );

    const withId = {
      ...address,
      id,
    };

    log('withid',withId)
    validate( addressSchema, withId );
    
    await redis.HSET( ADDRESSES, withId.id, serialize( withId ) );

    return id;
  },

// all keys
  // async matchingkeys(keypat ) {
  //   const keys = await redis.HKEYS( ADDRESSES );
  //   return Object.values( keys )
  //     .map( ( buffer ) => deserialize( buffer ) )
  //   .filter( ( key ) => {
  //     return key.toLowerCase().includes(keypat.toLowerCase());
  //   });    
  // },


  async update( id, newData ) {
    log( 'updating', id );

    validate( addressSchema, newData );

    await redis.HSET( ADDRESSES, id, serialize( newData ) );
  },

  async delete( id ) {
    log( 'deleting', id );

    await redis.HDEL( ADDRESSES, id );
  },

  async get( id ) {
    log( 'getting', id );

    const res = await redis.HGET( ADDRESSES, id );
    if ( !res ) return;
    return deserialize( res );
  },

  async search( searchString = '' ) {
    log( 'searching', searchString );

    // hint for the interview: Why won't this work in production? -> you don't want to make api call for every letter you type
    // better way would be once you get data in frontend filter those objects

    const addresses = await redis.HGETALL( ADDRESSES );

    return Object.values( addresses )
      .map( ( buffer ) => deserialize( buffer ) )
      // turn the addresses into a flat string
      .filter( ( address ) => {
        const searchable = Object.values( address ).join( ' ' ).toLowerCase();
        return searchable.includes( searchString.toLowerCase() );
      });
  },
};
