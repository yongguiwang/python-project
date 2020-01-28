var communicate,acom_analytics,utilities,started,startup=new Promise(function(e,t){"use strict";started=e}),startupComplete=!1;function registerActions(t){"use strict";function n(){return communicate.getModule("acro-web2pdf")}function o(){return communicate.getModule("acro-gstate")}var e,a=["*://*/*.pdf"],i=["all"],c=function(e){var t,n=e.splice();for(t=0;t<e.length;t+=1)n.push(e[t]+"?*")}(["*://*/*.ai","*://*/*.bmp","*://*/*.doc","*://*/*.docx","*://*/*.gif","*://*/*.indd","*://*/*.jpeg","*://*/*.jpg","*://*/*.odf","*://*/*.odg","*://*/*.odp","*://*/*.ods","*://*/*.odt","*://*/*.png","*://*/*.ppt","*://*/*.pptx","*://*/*.pptx","*://*/*.ps","*://*/*.psd","*://*/*.pub","*://*/*.rtf","*://*/*.stw","*://*/*.sxd","*://*/*.sxc","*://*/*.sxi","*://*/*.sxw","*://*/*.text","*://*/*.tif","*://*/*.tiff","*://*/*.txt","*://*/*.xls","*://*/*.xlsx"].concat(a));function r(e){return utilities&&utilities.getTranslation?utilities.getTranslation(e):chrome.i18n.getMessage(e)}function l(e){return(e.title||r("web2pdfUntitledFileName")).replace(/[<>?:|\*"\/\\'&\.]/g,"")}startupComplete||(startupComplete=!0,startup.then(function(e){chrome.runtime.getPlatformInfo(function(e){var t;SETTINGS.OS=e.os,SETTINGS.CHROME_VERSION=0,SETTINGS.EXTENSION_VERSION=0;try{(t=navigator.userAgent.match(/Chrome\/([0-9]+)/))&&(SETTINGS.CHROME_VERSION=+t[1])}catch(e){}try{SETTINGS.EXTENSION_VERSION=chrome.runtime.getManifest().version}catch(e){}"mac"===e.os?acom_analytics.event(acom_analytics.e.OS_MAC_OP):"win"===e.os&&acom_analytics.event(acom_analytics.e.OS_WIN_OP)}),t?"update"===t.reason?e.event(e.e.EXTENSION_UPDATE):"install"===t.reason&&e.event(e.e.EXTENSION_INSTALLED):e.event(e.e.EXTENSION_STARTUP),chrome.browserAction.onClicked.addListener(function(e){communicate.echo(e)})}),!SETTINGS.IS_READER&&SETTINGS.USE_ACROBAT?(chrome.contextMenus.create({title:r("web2pdfConvertPageContextMenu"),contexts:["page"],onclick:function(e,t){acom_analytics.event(acom_analytics.e.CONTEXT_MENU_CONVERT_PAGE),n().handleConversionRequest({tabId:t.id,caller:o().web2pdfCaller.MENU,action:o().web2pdfAction.CONVERT,context:o().web2pdfContext.PAGE,url:e.pageUrl||t.url,domtitle:l(t)})}}),chrome.contextMenus.create({title:r("web2pdfAppendPageContextMenu"),contexts:["page"],onclick:function(e,t){acom_analytics.event(acom_analytics.e.CONTEXT_MENU_APPEND_PAGE),n().handleConversionRequest({tabId:t.id,caller:o().web2pdfCaller.MENU,action:o().web2pdfAction.APPEND,context:o().web2pdfContext.PAGE,url:e.pageUrl||t.url,domtitle:l(t)})}}),chrome.contextMenus.create({title:r("web2pdfConvertLinkContextMenu"),contexts:["link"],onclick:function(e,t){acom_analytics.event(acom_analytics.e.CONTEXT_MENU_CONVERT_LINK),n().handleConversionRequest({tabId:t.id,caller:o().web2pdfCaller.MENU,action:o().web2pdfAction.CONVERT,context:o().web2pdfContext.LINK,url:e.linkUrl,domtitle:l(t)})}}),chrome.contextMenus.create({title:r("web2pdfAppendLinkContextMenu"),contexts:["link"],onclick:function(e,t){acom_analytics.event(acom_analytics.e.CONTEXT_MENU_APPEND_LINK),n().handleConversionRequest({tabId:t.id,caller:o().web2pdfCaller.MENU,action:o().web2pdfAction.APPEND,context:o().web2pdfContext.LINK,url:e.linkUrl,domtitle:l(t)})}})):SETTINGS.IS_READER||(e=chrome.contextMenus.create({title:"Adobe PDF",contexts:i,id:"pdf-page"}),chrome.contextMenus.create({title:"Upload PDF to acrobat.com",contexts:i,parentId:e,id:"upload",documentUrlPatterns:a}),chrome.contextMenus.create({title:"Upload and export to Word/Excel/PowerPoint/Images",contexts:i,parentId:e,id:"export",documentUrlPatterns:a}),chrome.contextMenus.create({title:"Upload link to acrobat.com",contexts:["link"],parentId:e,id:"upload_link",targetUrlPatterns:c}),chrome.contextMenus.create({title:"Upload image to acrobat.com",contexts:["image"],parentId:e,id:"upload-image"}),chrome.contextMenus.create({title:"Create a Slideshow from a Flickr album",contexts:i,parentId:e,id:"flickr-slideshow",documentUrlPatterns:["*://www.flickr.com/*"]}),chrome.contextMenus.create({title:"Create a contact sheet from Flickr images",contexts:i,parentId:e,id:"flickr-contact-sheet",documentUrlPatterns:["*://www.flickr.com/*"]})))}SETTINGS=SETTINGS||{USE_ACROBAT:!0},chrome.runtime.getPlatformInfo(function(e){"use strict";SETTINGS.OS=e.os}),require(["communicate","util","upload","download-manager","analytics","acro-gstate","acro-actions","acro-web2pdf","session","convert-to-zip"],function(e,n,t,o,a,i,c,r){"use strict";function l(e){return utilities&&utilities.getTranslation?utilities.getTranslation(e):chrome.i18n.getMessage(e)}chrome.management.getSelf(function(e){a.s||a.init(e.version,e.installType),c.getVersion(function(e){e!==SETTINGS.READER_VER&&e!==SETTINGS.ERP_READER_VER||(SETTINGS.IS_READER=!0,SETTINGS.IS_ACROBAT=!1,e===SETTINGS.ERP_READER_VER&&(SETTINGS.IS_ERP_READER=!0),function(e){e===SETTINGS.ERP_READER_VER?chrome.browserAction.setTitle({title:l("web2pdfConvertButtonToolTipERPReader")}):chrome.browserAction.setTitle({title:l("web2pdfOpenButtonText")})}(e)),registerActions(),started(a),function(e){var t="https://acrobat.adobe.com/us/en/landing/acrobat-pro-chrome-extension.html";SETTINGS.IS_READER&&(t="https://acrobat.adobe.com/us/en/landing/acrobat-reader-chrome-extension.html"),t="mac"===SETTINGS.OS?"data/js/options.html?os=mac":t,"false"!==n.getCookie("fte")&&n.createTab(t,function(){n.setCookie("fte","false",3650),e.event(e.e.FTE_LAUNCH)})}(a)})}),acom_analytics=a,communicate=e,utilities=n,SETTINGS.USE_ACROBAT||chrome.contextMenus.onClicked.addListener(function(e,t){var n={filename:t.title,tabId:t.id,menuItem:e.menuItemId,handleResult:"preview"};if("flickr-slideshow"===e.menuItemId||"flickr-contact-sheet"===e.menuItemId)return a.event(n,a.e.FLICKR_CONTEXT_CLICK),void communicate.deferMessage({panel_op:"flickr",tabId:t.id});"upload-image"===e.menuItemId&&(a.setOp("Image"),n.handleResult="image_preview",n.url=e.srcUrl),"upload_link"===e.menuItemId&&(a.setOp("Link"),n.url=e.linkUrl),"upload"===e.menuItemId&&(a.setOp("Link"),n.url=e.linkUrl),"pdf-page"===e.menuItemId&&(a.setOp("PdfPage"),n.url=e.pageUrl),20<n.filename.length&&(n.filename=n.filename.substring(0,19)),e.linkUrl?n.filename=e.linkUrl.split("/").splice(-1)[0].replace(/\?\S*/,""):e.srcUrl&&(n.url=e.srcUrl,n.filename=e.srcUrl.split("/").splice(-1)[0].replace(/\?\S*/,"")),"export"===e.menuItemId&&(n.handleResult="export"),o.proxy(o.do_upload(n))}),chrome.runtime.onMessage.addListener(communicate.proxy(communicate.handler))}),chrome.runtime.onInstalled.addListener(registerActions);