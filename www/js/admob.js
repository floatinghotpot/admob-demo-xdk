// place our admob ad unit id here
var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) {
  admobid = { // for Android
    banner: 'ca-app-pub-6869992474017983/9375997553',
    interstitial: 'ca-app-pub-6869992474017983/1657046752'
  };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
  admobid = { // for iOS
    banner: 'ca-app-pub-6869992474017983/4806197152',
    interstitial: 'ca-app-pub-6869992474017983/7563979554'
  };
} else {
  admobid = { // for Windows Phone
    banner: 'ca-app-pub-6869992474017983/8878394753',
    interstitial: 'ca-app-pub-6869992474017983/1355127956'
  };
}

function createSelectedBanner(){
  AdMob.createBanner({
    adId: admobid.banner,
    overlap: $('#overlap').is(':checked'),
    offsetTopBar: $('#offsetTopBar').is(':checked'),
    adSize: $('#adSize').val(),
    position: $('#adPosition').val(),
  });
}
function showBannerAtPosition(){
  AdMob.showBanner( $('#adPosition').val() );
}

function initAd(){
  AdMob.setOptions({
    // adSize: 'SMART_BANNER',
    // width: integer, // valid when set adSize 'CUSTOM'
    // height: integer, // valid when set adSize 'CUSTOM'
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
    bgColor: 'black', // color name, or '#RRGGBB'
    // x: integer,    // valid when set position to 0 / POS_XY
    // y: integer,    // valid when set position to 0 / POS_XY
    isTesting: true, // set to true, to receiving test ad for testing purpose
    // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
  });
  // new events, with variable to differentiate: adNetwork, adType, adEvent
  $(document).on('onAdFailLoad', function(data){
    alert('error: ' + data.error +
        ', reason: ' + data.reason +
        ', adNetwork:' + data.adNetwork +
        ', adType:' + data.adType +
        ', adEvent:' + data.adEvent); // adType: 'banner', 'interstitial', etc.
  });
  $(document).on('onAdLoaded', function(data){});
  $(document).on('onAdPresent', function(data){});
  $(document).on('onAdLeaveApp', function(data){});
  $(document).on('onAdDismiss', function(data){});

  $('#btn_create').click(createSelectedBanner);
  $('#btn_remove').click(function(){
    AdMob.removeBanner();
  });
  $('#btn_show').click(showBannerAtPosition);
  $('#btn_hide').click(function(){
    AdMob.hideBanner();
  });

  // test interstitial ad
  $('#btn_prepare').click(function(){
    AdMob.prepareInterstitial({
      adId:admobid.interstitial,
      autoShow: $('#autoshow').is(':checked'),
    });
  });
  $('#btn_showfull').click(function(){
    AdMob.showInterstitial();
  });

  // test case for #256, https://github.com/floatinghotpot/cordova-admob-pro/issues/256
  $(document).on('backbutton', function(){
    if(window.confirm('Are you sure to quit?')) navigator.app.exitApp();
  });

  // test case #283, https://github.com/floatinghotpot/cordova-admob-pro/issues/283
  $(document).on('resume', function(){
    AdMob.showInterstitial();
  });
}

// test the webview resized properly
$(window).resize(function(){
  $('#textinfo').html('web view: ' + $(window).width() + " x " + $(window).height());
});

function initAdMob() {
  if (! AdMob) { alert( 'admob plugin not ready' ); return; }

  initAd();

  // display a banner at startup
  createSelectedBanner();
}
