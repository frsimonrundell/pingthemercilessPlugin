import { useEffect, useRef } from 'react';
// import Timer from './timer';
import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import './index.css';
import { useState } from '@wordpress/element';


export default function Edit({ attributes, setAttributes}) {
  const { uid, siteName, siteURL, cmMessage} = attributes;

  // Create refs for the input elements
  const uidInputRef = useRef(null);
  const siteNameInputRef = useRef(null);
  const siteURLInputRef = useRef(null);

  useEffect(() => {
    // Ensure the DOM is ready
    const uidInput = document.getElementById('uid');
    if (uidInput) {
      // Nothing needed here yet
    }

    const siteNameInput = document.getElementById('siteName');
    if (siteNameInput) {
      // Nothing needed here yet
    }

    const siteURLInput = document.getElementById('siteURL');
    if (siteURLInput) {
      // Nothing needed here yet
    }
  }, []); // Empty dependency array means this effect runs once after the first render

  const onUidChange = (event) => {
    setAttributes({ uid: event.target.value });
  };

  const onSiteNameChange = (event) => {
    setAttributes({ siteName: event.target.value });
  };

  const onSiteURLChange = (event) => {
    setAttributes({ siteURL: event.target.value });
  };

  const handlerHideCmMessage = () => {
    setAttributes({cmMessage: ''});
  };

  const saveOptions = (config_data) => {
    jQuery(document).ready(function ($) {
      $.ajax({
        type: 'POST',
        url: ajaxurl, // This is a global variable that holds the URL to the admin-ajax.php file
        data: {
          action: 'update_custom_option',
          option_name: 'cm-pingthemerciless',
          option_value: config_data,
        },
        success: function (response) {
          setAttributes({cmMessage: response}); // Handle the response from the server
        },
      });
    });
  };

  const handlerSaveButton = () => {
    const uidInput = uidInputRef.current;
    const siteNameInput = siteNameInputRef.current;
    const siteURLInput = siteURLInputRef.current;

    if (uidInput && uidInput.value === '') {
      setAttributes({cmMessage: 'Not created a UID yet. Click on the COG icon'});
    } else {
      const config_data = {
        uid: uidInput ? uidInput.value : '',
        siteName: siteNameInput ? siteNameInput.value : '',
        siteURL: siteURLInput ? siteURLInput.value : '',
      };
      saveOptions(config_data);
    }
  };

  const createGUID = () => {
    const newUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

    setAttributes({ uid: newUID });

  };

  return (
    <div {...useBlockProps()}>
      <BlockControls
        controls={[
          {
            title: 'Generate GUID',
            icon: 'admin-generic',
            onClick: () => createGUID(),
          },
        ]}
      />
      <div id='pingblock' className='wp-block-cm-pingblock'>
        <div className='wp-block-cm-title'>Ping the Merciless</div>
        <p className='wp-block-cm-explanation'>
          This plugin sends a unique code to the <i>PingtheMerciless</i> site to confirm it is still up and running, so you can easily monitor it
        </p>
        <p className='wp-block-cm-explanation'>To generate a Unique Identifier, click on the Cog icon on the toolbar.</p>

        <div className='wp-block-cm-element'>
          <label className='wp-block-cm-label' htmlFor='uid'>
            UID:
          </label>
          <input
            className='wp-block-cm-input'
            type='text'
            id='uid'
            value={uid || ''}
            readOnly
            onChange={onUidChange}
            ref={uidInputRef}
          />
        </div>
        <div className='wp-block-cm-element'>
          <label className='wp-block-cm-label' htmlFor='siteName'>
            Website Name:
          </label>
          <input
            className='wp-block-cm-input'
            type='text'
            id='siteName'
            value={siteName || ''}
            onChange={onSiteNameChange}
            ref={siteNameInputRef}
          />
        </div>
        <div className='wp-block-cm-element'>
          <label className='wp-block-cm-label' htmlFor='siteURL'>
            Website URL:
          </label>
          <input
            className='wp-block-cm-input'
            type='text'
            id='siteURL'
            value={siteURL || ''}
            onChange={onSiteURLChange}
            ref={siteURLInputRef}
          />
        </div>
        <div className='wp-block-cm-element'>
          <input
            type='button'
            className='wp-block-cm-ping-button'
            id='Save'
            onClick={handlerSaveButton}
            onMouseOut={handlerHideCmMessage}
            value='Save'
          />
        <div id="cm-message" className="wp-block-cm-message">{cmMessage}</div>
        </div>
      </div>
    </div>
  );
}
