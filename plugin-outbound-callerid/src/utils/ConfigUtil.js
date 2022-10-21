import { Manager } from '@twilio/flex-ui';
const manager = Manager.getInstance();

class ConfigUtil {
  getAsset = async (assetFileName) => {
    console.debug('Getting asset:', assetFileName);
    const fetchUrl = `${process.env.FLEX_APP_FUNCTIONS_BASE}/get-asset-file`;
    const fetchBody = {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
      fileName: assetFileName,
    };
    const fetchOptions = {
      method: 'POST',
      body: new URLSearchParams(fetchBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };
  
    let config;
    try {
      const response = await fetch(fetchUrl, fetchOptions);
      config = await response.json();
      console.debug('CONFIG:', config);
    } catch (error) {
      console.error('Failed to get asset file');
    }
  
    return config;
  }

  updateConference = async (conferenceSid, announceUrl) => {
    console.debug('Updating Conference:', conferenceSid);
    const fetchUrl = `${process.env.FLEX_APP_FUNCTIONS_BASE}/update-conference`;
    const fetchBody = {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
      conferenceSid,
      announceUrl
    };
    const fetchOptions = {
      method: 'POST',
      body: new URLSearchParams(fetchBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };
  
    let conference;
    try {
      const response = await fetch(fetchUrl, fetchOptions);
      conference = await response.json();
      console.debug('Updated Conference:', conference);
    } catch (error) {
      console.error('Failed to update conference');
    }
    return conference;
  }
}

const configUtil = new ConfigUtil();

export default configUtil;