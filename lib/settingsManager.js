import clone from 'clone';
import deepmerge from 'deepmerge';
import Logger from './Logger';

import storage from './storage';

const logger = new Logger('settingsManager');

const DEFAULT_SIP_DOMAIN = 'sl.sl-soft.net';
const DEFAULT_SETTINGS =
{
	'display_name' : '11433',
	uri            : 'sip:11433@sl.sl-soft.net:15060',
	password       : 'aaa111',
	socket         :
	{
		uri             : 'wss://sl.sl-soft.net:18089/ws',
		'via_transport' : 'auto'
	},
	'registrar_server'    : null,
	'contact_uri'         : null,
	'authorization_user'  : null,
	'instance_id'         : null,
	'session_timers'      : true,
	'use_preloaded_route' : false,
	'realm' : 'sl.sl-soft.net:15060',
	pcConfig              :
	{
		rtcpMuxPolicy : 'negotiate',
		iceServers    :
		[
			{ urls: [ 'stun:sl.sl-soft.net:34788'] },
			{  "urls":"turn:121.40.211.230:443","credential":"789789" , "username": "bff" }
		],
		iceTransportPolicy: 'all',
        bundlePolicy: 'balanced'
	},
	// rtcOfferConstraints: {
	// 	offerToReceiveAudio: {exact: 1}, 
	// 	offerToReceiveVideo: {exact: 0}
	// },
	callstats :
	{
		enabled   : false,
		AppID     : null,
		AppSecret : null
	}
};

let settings;

// First, read settings from local storage
settings = storage.get();

if (settings)
	logger.debug('settings found in local storage');

// Try to read settings from a global SETTINGS object
if (window.SETTINGS)
{
	logger.debug('window.SETTINGS found');

	settings = deepmerge(
		window.SETTINGS,
		settings || {},
		{ arrayMerge: (destinationArray, sourceArray) => sourceArray });
}

// If not settings are found, clone default ones
if (!settings)
{
	logger.debug('no settings found, using default ones');

	settings = clone(DEFAULT_SETTINGS, false);
}

module.exports =
{
	get()
	{
		return settings;
	},

	set(newSettings)
	{
		storage.set(newSettings);
		settings = newSettings;
	},

	clear()
	{
		storage.clear();
		settings = clone(DEFAULT_SETTINGS, false);
	},

	isReady()
	{
		return Boolean(settings.uri);
	},

	getDefaultDomain()
	{
		return DEFAULT_SIP_DOMAIN;
	}
};
