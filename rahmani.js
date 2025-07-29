'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0x593531, _0x4531ca, _0x2e4b87, _0x1681ea) {
  if (_0x1681ea === undefined) {
    _0x1681ea = _0x2e4b87;
  }
  var _0x45a834 = Object.getOwnPropertyDescriptor(_0x4531ca, _0x2e4b87);
  if (!_0x45a834 || ("get" in _0x45a834 ? !_0x4531ca.__esModule : _0x45a834.writable || _0x45a834.configurable)) {
    _0x45a834 = {
      'enumerable': true,
      'get': function () {
        return _0x4531ca[_0x2e4b87];
      }
    };
  }
  Object.defineProperty(_0x593531, _0x1681ea, _0x45a834);
} : function (_0xcf80b5, _0x6b37e6, _0x16fc09, _0x1bb7a2) {
  if (_0x1bb7a2 === undefined) {
    _0x1bb7a2 = _0x16fc09;
  }
  _0xcf80b5[_0x1bb7a2] = _0x6b37e6[_0x16fc09];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x67f92b, _0x383d16) {
  Object.defineProperty(_0x67f92b, "default", {
    'enumerable': true,
    'value': _0x383d16
  });
} : function (_0xd24042, _0x4826c9) {
  _0xd24042["default"] = _0x4826c9;
});
var __importStar = this && this.__importStar || function (_0x3ef305) {
  if (_0x3ef305 && _0x3ef305.__esModule) {
    return _0x3ef305;
  }
  var _0x2b7cf6 = {};
  if (_0x3ef305 != null) {
    for (var _0x35fe15 in _0x3ef305) if (_0x35fe15 !== "default" && Object.prototype.hasOwnProperty.call(_0x3ef305, _0x35fe15)) {
      __createBinding(_0x2b7cf6, _0x3ef305, _0x35fe15);
    }
  }
  __setModuleDefault(_0x2b7cf6, _0x3ef305);
  return _0x2b7cf6;
};
var __importDefault = this && this.__importDefault || function (_0x9b447d) {
  return _0x9b447d && _0x9b447d.__esModule ? _0x9b447d : {
    'default': _0x9b447d
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1['default'].child({});
logger.level = "silent";
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
let fs = require("fs-extra");
let path = require("path");
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  verifierEtatJid,
  recupererActionJid
} = require('./bdd/antilien');
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./bdd/antibot");
let evt = require(__dirname + "/framework/rahmani");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
let {
  reagir
} = require(__dirname + "/framework/app");
var session = conf.session.replace(/RAHMAN-SMD-WA-BOT;;;=>/g, '');
const prefixe = conf.PREFIXE;
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/auth/creds.json")) {
      console.log("Connecting in progress ...");
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/auth/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), 'utf8');
    }
  } catch (_0x1ca2c8) {
    console.log("Session Invalid " + _0x1ca2c8);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': 'store'
  })
});
setTimeout(() => {
  async function _0x13988c() {
    0x0;
    const {
      version: _0x5f6fea,
      isLatest: _0x5a38cd
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x28a4b4,
      saveCreds: _0xeff6e0
    } = await baileys_1.useMultiFileAuthState(__dirname + "/auth");
    0x0;
    const _0x29fb39 = {
      'version': _0x5f6fea,
      'logger': pino({
        'level': "silent"
      }),
      'browser': ["RAHMANI-SMD", "safari", "1.0.0"],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x28a4b4.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x28a4b4.keys, logger)
      },
      'getMessage': async _0x1c7b10 => {
        if (store) {
          const _0x470922 = await store.loadMessage(_0x1c7b10.remoteJid, _0x1c7b10.id, undefined);
          return _0x470922.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0x313b00 = baileys_1['default'](_0x29fb39);
    store.bind(_0x313b00.ev);
    setInterval(() => {
      store.writeToFile('store.json');
    }, 0xbb8);
    _0x313b00.ev.on('messages.upsert', async _0x4e17b0 => {
      const {
        messages: _0x2b0d1b
      } = _0x4e17b0;
      const _0x404c88 = _0x2b0d1b[0x0];
      if (!_0x404c88.message) {
        return;
      }
      const _0x5d81a1 = _0x30eee6 => {
        if (!_0x30eee6) {
          return _0x30eee6;
        }
        if (/:\d+@/gi.test(_0x30eee6)) {
          0x0;
          let _0x3b400c = baileys_1.jidDecode(_0x30eee6) || {};
          return _0x3b400c.user && _0x3b400c.server && _0x3b400c.user + '@' + _0x3b400c.server || _0x30eee6;
        } else {
          return _0x30eee6;
        }
      };
      0x0;
      var _0x12647f = baileys_1.getContentType(_0x404c88.message);
      var _0x8ef313 = _0x12647f == "conversation" ? _0x404c88.message.conversation : _0x12647f == "imageMessage" ? _0x404c88.message.imageMessage?.["caption"] : _0x12647f == "videoMessage" ? _0x404c88.message.videoMessage?.["caption"] : _0x12647f == 'extendedTextMessage' ? _0x404c88.message?.["extendedTextMessage"]?.["text"] : _0x12647f == "buttonsResponseMessage" ? _0x404c88?.["message"]?.['buttonsResponseMessage']?.['selectedButtonId'] : _0x12647f == "listResponseMessage" ? _0x404c88.message?.["listResponseMessage"]?.['singleSelectReply']?.["selectedRowId"] : _0x12647f == "messageContextInfo" ? _0x404c88?.["message"]?.['buttonsResponseMessage']?.["selectedButtonId"] || _0x404c88.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] || _0x404c88.text : '';
      var _0x13a80f = _0x404c88.key.remoteJid;
      var _0x1c1036 = _0x5d81a1(_0x313b00.user.id);
      var _0x483c82 = _0x1c1036.split('@')[0x0];
      if (_0x13a80f === "120363244435092946@g.us") {
        return;
      }
      const _0x5ec1d6 = _0x13a80f?.["endsWith"]("@g.us");
      var _0x10f536 = _0x5ec1d6 ? await _0x313b00.groupMetadata(_0x13a80f) : '';
      var _0x3fd715 = _0x5ec1d6 ? _0x10f536.subject : '';
      var _0x4dccf0 = _0x404c88.message.extendedTextMessage?.["contextInfo"]?.['quotedMessage'];
      var _0x167590 = _0x5d81a1(_0x404c88.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      var _0xcad1f8 = _0x5ec1d6 ? _0x404c88.key.participant ? _0x404c88.key.participant : _0x404c88.participant : _0x13a80f;
      if (_0x404c88.key.fromMe) {
        _0xcad1f8 = _0x1c1036;
      }
      var _0x124bb0 = _0x5ec1d6 ? _0x404c88.key.participant : '';
      const {
        getAllSudoNumbers: _0x467074
      } = require('./bdd/sudo');
      const _0x3b5a15 = _0x404c88.pushName;
      const _0x3dc39f = await _0x467074();
      const _0x2005c7 = [_0x483c82, '233201817959', '233201817959', "233201817959", "233201817959", '233201817959', conf.NUMERO_OWNER].map(_0x2e37c3 => _0x2e37c3.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x11ca3c = _0x2005c7.concat(_0x3dc39f);
      const _0x4d0d1b = _0x11ca3c.includes(_0xcad1f8);
      var _0x11a867 = ['233201817959', '233201817959', "233201817959", "233201817959", '233201817959'].map(_0x27578f => _0x27578f.replace(/[^0-9]/g) + '@s.whatsapp.net').includes(_0xcad1f8);
      function _0x4c6918(_0x255344) {
        _0x313b00.sendMessage(_0x13a80f, {
          'text': _0x255344
        }, {
          'quoted': _0x404c88
        });
      }
      console.log("\t [][]...{RAHMAN-SMD}...[][]");
      console.log("=========== New message ===========");
      if (_0x5ec1d6) {
        console.log("message from the group : " + _0x3fd715);
      }
      console.log("message sent By : [" + _0x3b5a15 + " : " + _0xcad1f8.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("message type : " + _0x12647f);
      console.log("------ message content ------");
      console.log(_0x8ef313);
      function _0x3a8d98(_0x58fa6e) {
        let _0x2b9d2b = [];
        for (_0x4e17b0 of _0x58fa6e) {
          if (_0x4e17b0.admin == null) {
            continue;
          }
          _0x2b9d2b.push(_0x4e17b0.id);
        }
        return _0x2b9d2b;
      }
      var _0x128bf8 = conf.PRESENCE;
      if (_0x128bf8 == "online") {
        await _0x313b00.sendPresenceUpdate("available", _0x13a80f);
      } else {
        if (_0x128bf8 == "typing") {
          await _0x313b00.sendPresenceUpdate('composing', _0x13a80f);
        } else if (_0x128bf8 == "recording") {
          await _0x313b00.sendPresenceUpdate('recording', _0x13a80f);
        } else {
          await _0x313b00.sendPresenceUpdate("unavailable", _0x13a80f);
        }
      }
      const _0x12da23 = _0x5ec1d6 ? await _0x10f536.participants : '';
      let _0x4117ae = _0x5ec1d6 ? _0x3a8d98(_0x12da23) : '';
      const _0x572dc9 = _0x5ec1d6 ? _0x4117ae.includes(_0xcad1f8) : false;
      var _0x42afde = _0x5ec1d6 ? _0x4117ae.includes(_0x1c1036) : false;
      const _0x2b7c46 = _0x8ef313 ? _0x8ef313.trim().split(/ +/).slice(0x1) : null;
      const _0x5017ff = _0x8ef313 ? _0x8ef313.startsWith(prefixe) : false;
      const _0x250e96 = _0x5017ff ? _0x8ef313.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x289921 = conf.URL.split(',');
      function _0x55745e() {
        const _0x14b34a = Math.floor(Math.random() * _0x289921.length);
        const _0x324557 = _0x289921[_0x14b34a];
        return _0x324557;
      }
      var _0x45616b = {
        'superUser': _0x4d0d1b,
        'dev': _0x11a867,
        'verifGroupe': _0x5ec1d6,
        'mbre': _0x12da23,
        'membreGroupe': _0x124bb0,
        'verifAdmin': _0x572dc9,
        'infosGroupe': _0x10f536,
        'nomGroupe': _0x3fd715,
        'auteurMessage': _0xcad1f8,
        'nomAuteurMessage': _0x3b5a15,
        'idBot': _0x1c1036,
        'verifZokouAdmin': _0x42afde,
        'prefixe': prefixe,
        'arg': _0x2b7c46,
        'repondre': _0x4c6918,
        'mtype': _0x12647f,
        'groupeAdmin': _0x3a8d98,
        'msgRepondu': _0x4dccf0,
        'auteurMsgRepondu': _0x167590,
        'ms': _0x404c88,
        'mybotpic': _0x55745e
      };
      if (_0x13a80f === _0xcad1f8 && conf.AUTOREAD_MESSAGES === "yes") {
        _0x313b00.readMessages([_0x404c88.key]);
      }
      if (_0x13a80f === _0xcad1f8 && conf.CHATBOT === "yes") {
        const _0x3923d1 = await fetch("http://api.brainshop.ai/get?bid=181821&key=ltFzFIXrtj2SVMTX&uid=[uid]&msg=" + _0x8ef313);
        const _0x3dc7d3 = await _0x3923d1.json();
        await _0x4c6918(_0x3dc7d3.cnt);
      }
      if (_0x404c88.message.protocolMessage && _0x404c88.message.protocolMessage.type === 0x0 && conf.ADM === 'yes') {
        if (_0x404c88.key.fromMe || _0x404c88.message.protocolMessage.key.fromMe) {
          console.log("Delete message about me");
          return;
        }
        console.log("Message supprimer");
        let _0x1cca5a = _0x404c88.message.protocolMessage.key;
        try {
          const _0x3a6134 = fs.readFileSync('./store.json', "utf8");
          const _0x592ae4 = JSON.parse(_0x3a6134);
          let _0x35e598 = _0x592ae4.messages[_0x1cca5a.remoteJid];
          let _0x20e7cd;
          for (let _0x3bc22b = 0x0; _0x3bc22b < _0x35e598.length; _0x3bc22b++) {
            if (_0x35e598[_0x3bc22b].key.id === _0x1cca5a.id) {
              _0x20e7cd = _0x35e598[_0x3bc22b];
              break;
            }
          }
          if (_0x20e7cd === null || !_0x20e7cd || _0x20e7cd === "undefined") {
            console.log("Message not found");
            return;
          }
          await _0x313b00.sendMessage(_0x1c1036, {
            'image': {
              'url': './media/deleted-message.jpg'
            },
            'caption': "Rahman smd➡        🚫Anti-delete-message🚫\n Message from @" + _0x20e7cd.key.participant.split('@')[0x0] + '​',
            'mentions': [_0x20e7cd.key.participant]
          }).then(() => {
            _0x313b00.sendMessage(_0x1c1036, {
              'forward': _0x20e7cd
            }, {
              'quoted': _0x20e7cd
            });
          });
        } catch (_0x88f75e) {
          console.log(_0x88f75e);
        }
      }
      if (_0x404c88.key && _0x404c88.key.remoteJid === 'status@broadcast' && conf.AUTO_READ_STATUS === "yes") {
        await _0x313b00.readMessages([_0x404c88.key]);
      }
      if (_0x404c88.key && _0x404c88.key.remoteJid === 'status@broadcast' && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        if (_0x404c88.message.extendedTextMessage) {
          var _0x3d1b1b = _0x404c88.message.extendedTextMessage.text;
          await _0x313b00.sendMessage(_0x1c1036, {
            'text': _0x3d1b1b
          }, {
            'quoted': _0x404c88
          });
        } else {
          if (_0x404c88.message.imageMessage) {
            var _0x5b345a = _0x404c88.message.imageMessage.caption;
            var _0x49f868 = await _0x313b00.downloadAndSaveMediaMessage(_0x404c88.message.imageMessage);
            await _0x313b00.sendMessage(_0x1c1036, {
              'image': {
                'url': _0x49f868
              },
              'caption': _0x5b345a
            }, {
              'quoted': _0x404c88
            });
          } else {
            if (_0x404c88.message.videoMessage) {
              var _0x5b345a = _0x404c88.message.videoMessage.caption;
              var _0x23d030 = await _0x313b00.downloadAndSaveMediaMessage(_0x404c88.message.videoMessage);
              await _0x313b00.sendMessage(_0x1c1036, {
                'video': {
                  'url': _0x23d030
                },
                'caption': _0x5b345a
              }, {
                'quoted': _0x404c88
              });
            }
          }
        }
      }
      if (!_0x11a867 && _0x13a80f == "120363158701337904@g.us") {
        return;
      }
      if (_0x8ef313 && _0xcad1f8.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x9dcca0
        } = require('./bdd/level');
        try {
          await _0x9dcca0(_0xcad1f8);
        } catch (_0x189fb9) {
          console.error(_0x189fb9);
        }
      }
      try {
        if (_0x404c88.message[_0x12647f].contextInfo.mentionedJid && (_0x404c88.message[_0x12647f].contextInfo.mentionedJid.includes(_0x1c1036) || _0x404c88.message[_0x12647f].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0x13a80f == "120363158701337904@g.us") {
            return;
          }
          ;
          if (_0x4d0d1b) {
            console.log("hummm");
            return;
          }
          let _0x32e53e = require('./bdd/mention');
          let _0x40ecf4 = await _0x32e53e.recupererToutesLesValeurs();
          let _0x20a751 = _0x40ecf4[0x0];
          if (_0x20a751.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0x134530;
          if (_0x20a751.type.toLocaleLowerCase() === "image") {
            _0x134530 = {
              'image': {
                'url': _0x20a751.url
              },
              'caption': _0x20a751.message
            };
          } else {
            if (_0x20a751.type.toLocaleLowerCase() === "video") {
              _0x134530 = {
                'video': {
                  'url': _0x20a751.url
                },
                'caption': _0x20a751.message
              };
            } else {
              if (_0x20a751.type.toLocaleLowerCase() === "sticker") {
                let _0x1d3ed4 = new Sticker(_0x20a751.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': '12345',
                  'quality': 0x46,
                  'background': 'transparent'
                });
                const _0x39387f = await _0x1d3ed4.toBuffer();
                _0x134530 = {
                  'sticker': _0x39387f
                };
              } else if (_0x20a751.type.toLocaleLowerCase() === "audio") {
                _0x134530 = {
                  'audio': {
                    'url': _0x20a751.url
                  },
                  'mimetype': "audio/mp4"
                };
              }
            }
          }
          _0x313b00.sendMessage(_0x13a80f, _0x134530, {
            'quoted': _0x404c88
          });
        }
      } catch (_0x3c2042) {}
      try {
        const _0x562640 = await verifierEtatJid(_0x13a80f);
        if (_0x8ef313.includes("chat.whatsapp.com") && _0x5ec1d6 && _0x562640) {
          console.log("lien detecté");
          var _0x369449 = _0x5ec1d6 ? _0x4117ae.includes(_0x1c1036) : false;
          if (_0x4d0d1b || _0x572dc9 || !_0x369449) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x304626 = {
            'remoteJid': _0x13a80f,
            'fromMe': false,
            'id': _0x404c88.key.id,
            'participant': _0xcad1f8
          };
          var _0x2254b7 = "link detected, \n";
          var _0x15df98 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "GOLD-MD",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x15df98.toFile("st1.webp");
          var _0x379304 = await recupererActionJid(_0x13a80f);
          if (_0x379304 === "remove") {
            _0x2254b7 += "message deleted \n @" + _0xcad1f8.split('@')[0x0] + " removed from group.";
            await _0x313b00.sendMessage(_0x13a80f, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x313b00.sendMessage(_0x13a80f, {
              'text': _0x2254b7,
              'mentions': [_0xcad1f8]
            }, {
              'quoted': _0x404c88
            });
            try {
              await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
            } catch (_0x2c9f2b) {
              console.log("antiien ") + _0x2c9f2b;
            }
            await _0x313b00.sendMessage(_0x13a80f, {
              'delete': _0x304626
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x379304 === "delete") {
              _0x2254b7 += "Goodbye \n @" + _0xcad1f8.split('@')[0x0] + " Sending other group links here is prohibited!.";
              await _0x313b00.sendMessage(_0x13a80f, {
                'text': _0x2254b7,
                'mentions': [_0xcad1f8]
              }, {
                'quoted': _0x404c88
              });
              await _0x313b00.sendMessage(_0x13a80f, {
                'delete': _0x304626
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x379304 === "warn") {
                const {
                  getWarnCountByJID: _0x41e5ff,
                  ajouterUtilisateurAvecWarnCount: _0x79715b
                } = require("./bdd/warn");
                let _0x26443f = await _0x41e5ff(_0xcad1f8);
                let _0x5653cf = conf.WARN_COUNT;
                if (_0x26443f >= _0x5653cf) {
                  var _0x38c69c = "link detected , you will be remove because of reaching warn-limit";
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x38c69c,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x304626
                  });
                } else {
                  var _0x5be6c6 = _0x5653cf - _0x26443f;
                  var _0x519e72 = "Link detected , your warn_count was upgrade ;\n rest : " + _0x5be6c6 + " ";
                  await _0x79715b(_0xcad1f8);
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x519e72,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x304626
                  });
                }
              }
            }
          }
        }
      } catch (_0x1c48eb) {
        console.log("bdd err " + _0x1c48eb);
      }
      try {
        const _0x2daeb7 = await verifierEtatJid(_0x13a80f);
        if (_0x8ef313.includes('Fuck') && _0x5ec1d6 && _0x2daeb7) {
          console.log("bad word detected");
          var _0x369449 = _0x5ec1d6 ? _0x4117ae.includes(_0x1c1036) : false;
          if (_0x4d0d1b || _0x572dc9 || !_0x369449) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x588f9 = {
            'remoteJid': _0x13a80f,
            'fromMe': false,
            'id': _0x404c88.key.id,
            'participant': _0xcad1f8
          };
          var _0x2254b7 = "badword detected, \n";
          var _0x15df98 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': 'GOLD-MD',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x15df98.toFile('st1.webp');
          var _0x379304 = await recupererActionJid(_0x13a80f);
          if (_0x379304 === 'remove') {
            _0x2254b7 += "message deleted \n @" + _0xcad1f8.split('@')[0x0] + " removed from group.";
            await _0x313b00.sendMessage(_0x13a80f, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x313b00.sendMessage(_0x13a80f, {
              'text': _0x2254b7,
              'mentions': [_0xcad1f8]
            }, {
              'quoted': _0x404c88
            });
            try {
              await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
            } catch (_0x45f066) {
              console.log("antiword") + _0x45f066;
            }
            await _0x313b00.sendMessage(_0x13a80f, {
              'delete': _0x588f9
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x379304 === "delete") {
              _0x2254b7 += "Goodbye \n @" + _0xcad1f8.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x313b00.sendMessage(_0x13a80f, {
                'text': _0x2254b7,
                'mentions': [_0xcad1f8]
              }, {
                'quoted': _0x404c88
              });
              await _0x313b00.sendMessage(_0x13a80f, {
                'delete': _0x588f9
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x379304 === "warn") {
                const {
                  getWarnCountByJID: _0x16702d,
                  ajouterUtilisateurAvecWarnCount: _0x54bf09
                } = require("./bdd/warn");
                let _0x2379a0 = await _0x16702d(_0xcad1f8);
                let _0x522cf3 = conf.WARN_COUNT;
                if (_0x2379a0 >= _0x522cf3) {
                  var _0x38c69c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x38c69c,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x588f9
                  });
                } else {
                  var _0x5be6c6 = _0x522cf3 - _0x2379a0;
                  var _0x519e72 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x5be6c6 + " ";
                  await _0x54bf09(_0xcad1f8);
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x519e72,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x588f9
                  });
                }
              }
            }
          }
        }
      } catch (_0x4732da) {
        console.log("bdd err " + _0x4732da);
      }
      try {
        const _0x30910c = await verifierEtatJid(_0x13a80f);
        if (_0x8ef313.includes("fuck") && _0x5ec1d6 && _0x30910c) {
          console.log("bad word detected");
          var _0x369449 = _0x5ec1d6 ? _0x4117ae.includes(_0x1c1036) : false;
          if (_0x4d0d1b || _0x572dc9 || !_0x369449) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x1bce2b = {
            'remoteJid': _0x13a80f,
            'fromMe': false,
            'id': _0x404c88.key.id,
            'participant': _0xcad1f8
          };
          var _0x2254b7 = "badword detected, \n";
          var _0x15df98 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "RAHMAN-SMD",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x15df98.toFile("st1.webp");
          var _0x379304 = await recupererActionJid(_0x13a80f);
          if (_0x379304 === "remove") {
            _0x2254b7 += "message deleted \n @" + _0xcad1f8.split('@')[0x0] + " removed from group.";
            await _0x313b00.sendMessage(_0x13a80f, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x313b00.sendMessage(_0x13a80f, {
              'text': _0x2254b7,
              'mentions': [_0xcad1f8]
            }, {
              'quoted': _0x404c88
            });
            try {
              await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
            } catch (_0x415a13) {
              console.log('antiword') + _0x415a13;
            }
            await _0x313b00.sendMessage(_0x13a80f, {
              'delete': _0x1bce2b
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x379304 === "delete") {
              _0x2254b7 += "Goodbye \n @" + _0xcad1f8.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x313b00.sendMessage(_0x13a80f, {
                'text': _0x2254b7,
                'mentions': [_0xcad1f8]
              }, {
                'quoted': _0x404c88
              });
              await _0x313b00.sendMessage(_0x13a80f, {
                'delete': _0x1bce2b
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x379304 === "warn") {
                const {
                  getWarnCountByJID: _0x393d34,
                  ajouterUtilisateurAvecWarnCount: _0x51613b
                } = require("./bdd/warn");
                let _0x613706 = await _0x393d34(_0xcad1f8);
                let _0x5d0a9e = conf.WARN_COUNT;
                if (_0x613706 >= _0x5d0a9e) {
                  var _0x38c69c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x38c69c,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x1bce2b
                  });
                } else {
                  var _0x5be6c6 = _0x5d0a9e - _0x613706;
                  var _0x519e72 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x5be6c6 + " ";
                  await _0x51613b(_0xcad1f8);
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x519e72,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x1bce2b
                  });
                }
              }
            }
          }
        }
      } catch (_0xa19cbe) {
        console.log("bdd err " + _0xa19cbe);
      }
      try {
        const _0x53c97a = await verifierEtatJid(_0x13a80f);
        if (_0x8ef313.includes("YEyy") && _0x5ec1d6 && _0x53c97a) {
          console.log("bad word detected");
          var _0x369449 = _0x5ec1d6 ? _0x4117ae.includes(_0x1c1036) : false;
          if (_0x4d0d1b || _0x572dc9 || !_0x369449) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x58c045 = {
            'remoteJid': _0x13a80f,
            'fromMe': false,
            'id': _0x404c88.key.id,
            'participant': _0xcad1f8
          };
          var _0x2254b7 = "Levelup Message detected, \n";
          var _0x15df98 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "GOLD-MD",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x15df98.toFile("st1.webp");
          var _0x379304 = await recupererActionJid(_0x13a80f);
          if (_0x379304 === "remove") {
            _0x2254b7 += "Level up message deleted \n @" + _0xcad1f8.split('@')[0x0] + " removed from group.";
            await _0x313b00.sendMessage(_0x13a80f, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x313b00.sendMessage(_0x13a80f, {
              'text': _0x2254b7,
              'mentions': [_0xcad1f8]
            }, {
              'quoted': _0x404c88
            });
            try {
              await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
            } catch (_0x3fec08) {
              console.log("antiword") + _0x3fec08;
            }
            await _0x313b00.sendMessage(_0x13a80f, {
              'delete': _0x58c045
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x379304 === 'delete') {
              _0x2254b7 += "Goodbye \n @" + _0xcad1f8.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x313b00.sendMessage(_0x13a80f, {
                'text': _0x2254b7,
                'mentions': [_0xcad1f8]
              }, {
                'quoted': _0x404c88
              });
              await _0x313b00.sendMessage(_0x13a80f, {
                'delete': _0x58c045
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x379304 === 'warn') {
                const {
                  getWarnCountByJID: _0x5c100e,
                  ajouterUtilisateurAvecWarnCount: _0x24fb6e
                } = require("./bdd/warn");
                let _0x1acb90 = await _0x5c100e(_0xcad1f8);
                let _0x589c4f = conf.WARN_COUNT;
                if (_0x1acb90 >= _0x589c4f) {
                  var _0x38c69c = "Level up message detected , you will be remove because of reaching warn-limit";
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x38c69c,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], 'remove');
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x58c045
                  });
                } else {
                  var _0x5be6c6 = _0x589c4f - _0x1acb90;
                  var _0x519e72 = "Level Up message detected , your warn_count was upgrade ;\n rest : " + _0x5be6c6 + " ";
                  await _0x24fb6e(_0xcad1f8);
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x519e72,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x58c045
                  });
                }
              }
            }
          }
        }
      } catch (_0x3993ca) {
        console.log("bdd err " + _0x3993ca);
      }
      try {
        const _0x3573f1 = await verifierEtatJid(_0x13a80f);
        if (_0x8ef313.includes("Pussy") && _0x5ec1d6 && _0x3573f1) {
          console.log("bad word detected");
          var _0x369449 = _0x5ec1d6 ? _0x4117ae.includes(_0x1c1036) : false;
          if (_0x4d0d1b || _0x572dc9 || !_0x369449) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x4b2216 = {
            'remoteJid': _0x13a80f,
            'fromMe': false,
            'id': _0x404c88.key.id,
            'participant': _0xcad1f8
          };
          var _0x2254b7 = "badword detected, \n";
          var _0x15df98 = new Sticker('https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif', {
            'pack': "RAHMAN-SMD",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x15df98.toFile("st1.webp");
          var _0x379304 = await recupererActionJid(_0x13a80f);
          if (_0x379304 === "remove") {
            _0x2254b7 += "message deleted \n @" + _0xcad1f8.split('@')[0x0] + " removed from group.";
            await _0x313b00.sendMessage(_0x13a80f, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x313b00.sendMessage(_0x13a80f, {
              'text': _0x2254b7,
              'mentions': [_0xcad1f8]
            }, {
              'quoted': _0x404c88
            });
            try {
              await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
            } catch (_0x4e5236) {
              console.log("antiword") + _0x4e5236;
            }
            await _0x313b00.sendMessage(_0x13a80f, {
              'delete': _0x4b2216
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x379304 === 'delete') {
              _0x2254b7 += "Goodbye \n @" + _0xcad1f8.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x313b00.sendMessage(_0x13a80f, {
                'text': _0x2254b7,
                'mentions': [_0xcad1f8]
              }, {
                'quoted': _0x404c88
              });
              await _0x313b00.sendMessage(_0x13a80f, {
                'delete': _0x4b2216
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x379304 === "warn") {
                const {
                  getWarnCountByJID: _0x367499,
                  ajouterUtilisateurAvecWarnCount: _0x5bc636
                } = require('./bdd/warn');
                let _0x53413b = await _0x367499(_0xcad1f8);
                let _0x551a02 = conf.WARN_COUNT;
                if (_0x53413b >= _0x551a02) {
                  var _0x38c69c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x38c69c,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], 'remove');
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x4b2216
                  });
                } else {
                  var _0x5be6c6 = _0x551a02 - _0x53413b;
                  var _0x519e72 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x5be6c6 + " ";
                  await _0x5bc636(_0xcad1f8);
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x519e72,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x4b2216
                  });
                }
              }
            }
          }
        }
      } catch (_0x59f5c4) {
        console.log("bdd err " + _0x59f5c4);
      }
      try {
        const _0x108e3c = await verifierEtatJid(_0x13a80f);
        if (_0x8ef313.includes('Motherfucker') && _0x5ec1d6 && _0x108e3c) {
          console.log("bad word detected");
          var _0x369449 = _0x5ec1d6 ? _0x4117ae.includes(_0x1c1036) : false;
          if (_0x4d0d1b || _0x572dc9 || !_0x369449) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x4608e6 = {
            'remoteJid': _0x13a80f,
            'fromMe': false,
            'id': _0x404c88.key.id,
            'participant': _0xcad1f8
          };
          var _0x2254b7 = "badword detected, \n";
          var _0x15df98 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': 'GOLD-MD',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x15df98.toFile('st1.webp');
          var _0x379304 = await recupererActionJid(_0x13a80f);
          if (_0x379304 === "remove") {
            _0x2254b7 += "message deleted \n @" + _0xcad1f8.split('@')[0x0] + " removed from group.";
            await _0x313b00.sendMessage(_0x13a80f, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x313b00.sendMessage(_0x13a80f, {
              'text': _0x2254b7,
              'mentions': [_0xcad1f8]
            }, {
              'quoted': _0x404c88
            });
            try {
              await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], 'remove');
            } catch (_0x1222e9) {
              console.log("antiword") + _0x1222e9;
            }
            await _0x313b00.sendMessage(_0x13a80f, {
              'delete': _0x4608e6
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x379304 === "delete") {
              _0x2254b7 += "Goodbye \n @" + _0xcad1f8.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x313b00.sendMessage(_0x13a80f, {
                'text': _0x2254b7,
                'mentions': [_0xcad1f8]
              }, {
                'quoted': _0x404c88
              });
              await _0x313b00.sendMessage(_0x13a80f, {
                'delete': _0x4608e6
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x379304 === "warn") {
                const {
                  getWarnCountByJID: _0x3d65c9,
                  ajouterUtilisateurAvecWarnCount: _0x44244c
                } = require("./bdd/warn");
                let _0x594aca = await _0x3d65c9(_0xcad1f8);
                let _0x11b642 = conf.WARN_COUNT;
                if (_0x594aca >= _0x11b642) {
                  var _0x38c69c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x38c69c,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x4608e6
                  });
                } else {
                  var _0x5be6c6 = _0x11b642 - _0x594aca;
                  var _0x519e72 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x5be6c6 + " ";
                  await _0x44244c(_0xcad1f8);
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x519e72,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x4608e6
                  });
                }
              }
            }
          }
        }
      } catch (_0xcd37b5) {
        console.log("bdd err " + _0xcd37b5);
      }
      try {
        const _0x43b359 = await verifierEtatJid(_0x13a80f);
        if (_0x8ef313.includes("kuma") && _0x5ec1d6 && _0x43b359) {
          console.log("bad word detected");
          var _0x369449 = _0x5ec1d6 ? _0x4117ae.includes(_0x1c1036) : false;
          if (_0x4d0d1b || _0x572dc9 || !_0x369449) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x1584d4 = {
            'remoteJid': _0x13a80f,
            'fromMe': false,
            'id': _0x404c88.key.id,
            'participant': _0xcad1f8
          };
          var _0x2254b7 = "badword detected, \n";
          var _0x15df98 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "GOLD-MD",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x15df98.toFile('st1.webp');
          var _0x379304 = await recupererActionJid(_0x13a80f);
          if (_0x379304 === "remove") {
            _0x2254b7 += "message deleted \n @" + _0xcad1f8.split('@')[0x0] + " removed from group.";
            await _0x313b00.sendMessage(_0x13a80f, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x313b00.sendMessage(_0x13a80f, {
              'text': _0x2254b7,
              'mentions': [_0xcad1f8]
            }, {
              'quoted': _0x404c88
            });
            try {
              await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], 'remove');
            } catch (_0x47d23c) {
              console.log("antiword") + _0x47d23c;
            }
            await _0x313b00.sendMessage(_0x13a80f, {
              'delete': _0x1584d4
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x379304 === "delete") {
              _0x2254b7 += "Goodbye \n @" + _0xcad1f8.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x313b00.sendMessage(_0x13a80f, {
                'text': _0x2254b7,
                'mentions': [_0xcad1f8]
              }, {
                'quoted': _0x404c88
              });
              await _0x313b00.sendMessage(_0x13a80f, {
                'delete': _0x1584d4
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x379304 === "warn") {
                const {
                  getWarnCountByJID: _0x12a12a,
                  ajouterUtilisateurAvecWarnCount: _0x535156
                } = require("./bdd/warn");
                let _0x1ff237 = await _0x12a12a(_0xcad1f8);
                let _0x5dfe75 = conf.WARN_COUNT;
                if (_0x1ff237 >= _0x5dfe75) {
                  var _0x38c69c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x38c69c,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], 'remove');
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x1584d4
                  });
                } else {
                  var _0x5be6c6 = _0x5dfe75 - _0x1ff237;
                  var _0x519e72 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x5be6c6 + " ";
                  await _0x535156(_0xcad1f8);
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x519e72,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x1584d4
                  });
                }
              }
            }
          }
        }
      } catch (_0x1923a6) {
        console.log("bdd err " + _0x1923a6);
      }
      try {
        const _0x55e17b = await verifierEtatJid(_0x13a80f);
        if (_0x8ef313.includes('pussy') && _0x5ec1d6 && _0x55e17b) {
          console.log("bad word detected");
          var _0x369449 = _0x5ec1d6 ? _0x4117ae.includes(_0x1c1036) : false;
          if (_0x4d0d1b || _0x572dc9 || !_0x369449) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x285e7d = {
            'remoteJid': _0x13a80f,
            'fromMe': false,
            'id': _0x404c88.key.id,
            'participant': _0xcad1f8
          };
          var _0x2254b7 = "badword detected, \n";
          var _0x15df98 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "GOLD-MD",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x15df98.toFile("st1.webp");
          var _0x379304 = await recupererActionJid(_0x13a80f);
          if (_0x379304 === "remove") {
            _0x2254b7 += "message deleted \n @" + _0xcad1f8.split('@')[0x0] + " removed from group.";
            await _0x313b00.sendMessage(_0x13a80f, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x313b00.sendMessage(_0x13a80f, {
              'text': _0x2254b7,
              'mentions': [_0xcad1f8]
            }, {
              'quoted': _0x404c88
            });
            try {
              await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
            } catch (_0x44d224) {
              console.log("antiword") + _0x44d224;
            }
            await _0x313b00.sendMessage(_0x13a80f, {
              'delete': _0x285e7d
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x379304 === "delete") {
              _0x2254b7 += "Goodbye \n @" + _0xcad1f8.split('@')[0x0] + " using bad words here is prohibited!.";
              await _0x313b00.sendMessage(_0x13a80f, {
                'text': _0x2254b7,
                'mentions': [_0xcad1f8]
              }, {
                'quoted': _0x404c88
              });
              await _0x313b00.sendMessage(_0x13a80f, {
                'delete': _0x285e7d
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x379304 === "warn") {
                const {
                  getWarnCountByJID: _0x48c0f6,
                  ajouterUtilisateurAvecWarnCount: _0x584496
                } = require('./bdd/warn');
                let _0x39b452 = await _0x48c0f6(_0xcad1f8);
                let _0x42f358 = conf.WARN_COUNT;
                if (_0x39b452 >= _0x42f358) {
                  var _0x38c69c = "bad word detected , you will be remove because of reaching warn-limit";
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x38c69c,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], 'remove');
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x285e7d
                  });
                } else {
                  var _0x5be6c6 = _0x42f358 - _0x39b452;
                  var _0x519e72 = "bad word detected , your warn_count was upgrade ;\n rest : " + _0x5be6c6 + " ";
                  await _0x584496(_0xcad1f8);
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x519e72,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x285e7d
                  });
                }
              }
            }
          }
        }
      } catch (_0x2a1b74) {
        console.log("bdd err " + _0x2a1b74);
      }
      try {
        const _0xc036e = _0x404c88.key?.['id']?.["startsWith"]("BAE5") && _0x404c88.key?.['id']?.["length"] === 0x10;
        const _0x130566 = _0x404c88.key?.['id']?.['startsWith']('BAES') && _0x404c88.key?.['id']?.["length"] === 0x10;
        if (_0xc036e || _0x130566) {
          if (_0x12647f === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x2d4649 = await atbverifierEtatJid(_0x13a80f);
          if (!_0x2d4649) {
            return;
          }
          ;
          if (_0x572dc9 || _0xcad1f8 === _0x1c1036) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x3186ff = {
            'remoteJid': _0x13a80f,
            'fromMe': false,
            'id': _0x404c88.key.id,
            'participant': _0xcad1f8
          };
          var _0x2254b7 = "bot detected, \n";
          var _0x15df98 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "RAHMAN-SMD",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x15df98.toFile("st1.webp");
          var _0x379304 = await atbrecupererActionJid(_0x13a80f);
          if (_0x379304 === "remove") {
            _0x2254b7 += "message deleted \n @" + _0xcad1f8.split('@')[0x0] + " removed from group.";
            await _0x313b00.sendMessage(_0x13a80f, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x313b00.sendMessage(_0x13a80f, {
              'text': _0x2254b7,
              'mentions': [_0xcad1f8]
            }, {
              'quoted': _0x404c88
            });
            try {
              await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
            } catch (_0x103e9b) {
              console.log("antibot ") + _0x103e9b;
            }
            await _0x313b00.sendMessage(_0x13a80f, {
              'delete': _0x3186ff
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x379304 === "delete") {
              _0x2254b7 += "message delete \n @" + _0xcad1f8.split('@')[0x0] + " Avoid sending link.";
              await _0x313b00.sendMessage(_0x13a80f, {
                'text': _0x2254b7,
                'mentions': [_0xcad1f8]
              }, {
                'quoted': _0x404c88
              });
              await _0x313b00.sendMessage(_0x13a80f, {
                'delete': _0x3186ff
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x379304 === "warn") {
                const {
                  getWarnCountByJID: _0x2b6549,
                  ajouterUtilisateurAvecWarnCount: _0x51f9f6
                } = require("./bdd/warn");
                let _0x4aadaa = await _0x2b6549(_0xcad1f8);
                let _0x397233 = conf.WARN_COUNT;
                if (_0x4aadaa >= _0x397233) {
                  var _0x38c69c = "bot detected ;you will be removed because of reaching warn-limit";
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x38c69c,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.groupParticipantsUpdate(_0x13a80f, [_0xcad1f8], "remove");
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x3186ff
                  });
                } else {
                  var _0x5be6c6 = _0x397233 - _0x4aadaa;
                  var _0x519e72 = "bot detected , your warn_count was upgrade ;\n rest : " + _0x5be6c6 + " ";
                  await _0x51f9f6(_0xcad1f8);
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'text': _0x519e72,
                    'mentions': [_0xcad1f8]
                  }, {
                    'quoted': _0x404c88
                  });
                  await _0x313b00.sendMessage(_0x13a80f, {
                    'delete': _0x3186ff
                  });
                }
              }
            }
          }
        }
      } catch (_0x5c3c9f) {
        console.log(".... " + _0x5c3c9f);
      }
      if (_0x5017ff) {
        const _0xa7f102 = evt.cm.find(_0x3bc6c0 => _0x3bc6c0.nomCom === _0x250e96);
        if (_0xa7f102) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x4d0d1b) {
              return;
            }
            if (!_0x4d0d1b && _0x13a80f === _0xcad1f8 && conf.PM_PERMIT === "yes") {
              _0x4c6918("You don't have acces to commands here");
              return;
            }
            if (!_0x4d0d1b && _0x5ec1d6) {
              let _0x1492d4 = await isGroupBanned(_0x13a80f);
              if (_0x1492d4) {
                return;
              }
            }
            if (!_0x572dc9 && _0x5ec1d6) {
              let _0x3c9fb7 = await isGroupOnlyAdmin(_0x13a80f);
              if (_0x3c9fb7) {
                return;
              }
            }
            if (!_0x4d0d1b) {
              let _0x19e216 = await isUserBanned(_0xcad1f8);
              if (_0x19e216) {
                _0x4c6918("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x13a80f, _0x313b00, _0x404c88, _0xa7f102.reaction);
            _0xa7f102.fonction(_0x13a80f, _0x313b00, _0x45616b);
          } catch (_0x511b85) {
            console.log("😡😡 " + _0x511b85);
            _0x313b00.sendMessage(_0x13a80f, {
              'text': "😡😡 " + _0x511b85
            }, {
              'quoted': _0x404c88
            });
          }
        }
      }
    });
    const {
      recupevents: _0x57fbc2
    } = require("./bdd/welcome");
    _0x313b00.ev.on("group-participants.update", async _0x26d50e => {
      console.log(_0x26d50e);
      let _0x4bb052;
      try {
        _0x4bb052 = await _0x313b00.profilePictureUrl(_0x26d50e.id, "image");
      } catch {
        _0x4bb052 = "https://i.postimg.cc/1XQq5DzP/pictures-white949544-GOjsnnsnznznzbzbbzbz7777-GOLDLD-PIC.png";
      }
      try {
        const _0x2748da = await _0x313b00.groupMetadata(_0x26d50e.id);
        if (_0x26d50e.action == 'add' && (await _0x57fbc2(_0x26d50e.id, 'welcome')) == 'on') {
          let _0x38fe8c = "RAHMAN-SMD\n";
          let _0x192ed6 = _0x26d50e.participants;
          for (let _0x2d1870 of _0x192ed6) {
            _0x38fe8c += "Hello @" + _0x2d1870.split('@')[0x0] + "\n";
          }
          _0x38fe8c += "*You are welcomed here.* \n            \n*You MAY read the group description FOR more info and Avoid getting removed*\n            \n     \n            \n ♦ *GROUP DESCRIPTION* ♦\n\n" + _0x2748da.desc + "\n\n💫MADE BY💫 Rahmani";
          _0x313b00.sendMessage(_0x26d50e.id, {
            'image': {
              'url': _0x4bb052
            },
            'caption': _0x38fe8c,
            'mentions': _0x192ed6
          });
        } else {
          if (_0x26d50e.action == "remove" && (await _0x57fbc2(_0x26d50e.id, 'goodbye')) == 'on') {
            let _0x497b3d = "Goodbye to that Fallen soldier, MADE BY *RAHMAN-SMD*;\n";
            let _0x10c5b7 = _0x26d50e.participants;
            for (let _0xbf3574 of _0x10c5b7) {
              _0x497b3d += '@' + _0xbf3574.split('@')[0x0] + "\n";
            }
            _0x313b00.sendMessage(_0x26d50e.id, {
              'text': _0x497b3d,
              'mentions': _0x10c5b7
            });
          } else {
            if (_0x26d50e.action == "promote" && (await _0x57fbc2(_0x26d50e.id, 'antipromote')) == 'on') {
              if (_0x26d50e.author == _0x2748da.owner || _0x26d50e.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x26d50e.author == decodeJid(_0x313b00.user.id) || _0x26d50e.author == _0x26d50e.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x313b00.groupParticipantsUpdate(_0x26d50e.id, [_0x26d50e.author, _0x26d50e.participants[0x0]], 'demote');
              _0x313b00.sendMessage(_0x26d50e.id, {
                'text': '@' + _0x26d50e.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x26d50e.author.split('@')[0x0] + " and @" + _0x26d50e.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x26d50e.author, _0x26d50e.participants[0x0]]
              });
            } else {
              if (_0x26d50e.action == "demote" && (await _0x57fbc2(_0x26d50e.id, 'antidemote')) == 'on') {
                if (_0x26d50e.author == _0x2748da.owner || _0x26d50e.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x26d50e.author == decodeJid(_0x313b00.user.id) || _0x26d50e.author == _0x26d50e.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x313b00.groupParticipantsUpdate(_0x26d50e.id, [_0x26d50e.author], "demote");
                await _0x313b00.groupParticipantsUpdate(_0x26d50e.id, [_0x26d50e.participants[0x0]], "promote");
                _0x313b00.sendMessage(_0x26d50e.id, {
                  'text': '@' + _0x26d50e.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x26d50e.participants[0x0].split('@')[0x0] + ". Consequently, he has been demonated from the admin sit.",
                  'mentions': [_0x26d50e.author, _0x26d50e.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x17d1ba) {
        console.error(_0x17d1ba);
      }
    });
    _0x313b00.ev.on("contacts.upsert", async _0x776cac => {
      const _0x127601 = _0x5e5299 => {
        for (const _0x20ff20 of _0x5e5299) {
          if (store.contacts[_0x20ff20.id]) {
            Object.assign(store.contacts[_0x20ff20.id], _0x20ff20);
          } else {
            store.contacts[_0x20ff20.id] = _0x20ff20;
          }
        }
        return;
      };
      _0x127601(_0x776cac);
    });
    _0x313b00.ev.on("connection.update", async _0x3981a8 => {
      const {
        lastDisconnect: _0x420a9b,
        connection: _0x5698fe
      } = _0x3981a8;
      if (_0x5698fe === "connecting") {
        console.log("RAHMAN-SMD STARTING ERROR ❌...");
      } else {
        if (_0x5698fe === "open") {
          console.log("RAHMAN-SMD STARTED");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log("------");
          0x0;
          await baileys_1.delay(0x12c);
          console.log("------------------/-----");
          console.log("RAHMAN-SMD IS ACTIVE NOW 🕸\n\n");
          console.log("Installing Commands ...\n");
          fs.readdirSync(__dirname + "/commands").forEach(_0xf70ee6 => {
            if (path.extname(_0xf70ee6).toLowerCase() == ".js") {
              try {
                require(__dirname + "/commands/" + _0xf70ee6);
                console.log(_0xf70ee6 + " RAHMAN-SMD STARTING");
              } catch (_0x5990ed) {
                console.log(_0xf70ee6 + " could not be loaded for the following reasons  : " + _0x5990ed);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0xabd78e;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0xabd78e = "public";
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0xabd78e = "private";
          } else {
            _0xabd78e = "undefined";
          }
          console.log("COMMANDS ADDED IN RAHMAN-SMD");
          if (conf.DP.toLowerCase() === "yes") {
            let _0xde8154 = "*🚀 RAHMAN-SMD STARTED 🚀*\n                \n🚀 DEVELOPER: Rahman  \n🚀 PREFIX: " + prefixe + "\n🚀 MODE: " + _0xabd78e + " \n🚀 COMMANDS: " + evt.cm.length + "\n🚀 CREATED: *29.07.2025*︎\n\n___________________________________\n   \n \n╔═════💫\n║🚀 *RAHMAN-SMD WHATSAPP BOT*\n╚════════════════>\n___________________________________\n\n*🚀 MADE BY RAHMAN 🚀*";
            await _0x313b00.sendMessage("zk.user.id", {
              'text': _0xde8154
            });
          }
        } else {
          if (_0x5698fe == "close") {
            let _0x10664c = new boom_1.Boom(_0x420a9b?.['error'])?.["output"]['statusCode'];
            if (_0x10664c === baileys_1.DisconnectReason.badSession) {
              console.log("Wrong session ID. please rescan the QR or use pairing code by RAHMAN SMD...");
            } else {
              if (_0x10664c === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! RAHMAN-SMD Error, reconnection in progress ...");
                _0x13988c();
              } else {
                if (_0x10664c === baileys_1.DisconnectReason.connectionLost) {
                  console.log("RAHMAN-SMD STARTING ERROR  😞,,, Starting in progress... ");
                  _0x13988c();
                } else {
                  if (_0x10664c === baileys_1.DisconnectReason?.['connectionReplaced']) {
                    console.log("connection replaced,,, a session is already open, please close it!!!");
                  } else {
                    if (_0x10664c === baileys_1.DisconnectReason.loggedOut) {
                      console.log("RAHMAN SMD Disconnected,,, please rescan the qr code or use pairing code");
                    } else {
                      if (_0x10664c === baileys_1.DisconnectReason.restartRequired) {
                        console.log("Re-Boting in progress ✔️");
                        _0x13988c();
                      } else {
                        console.log("Re-Boting Error ❌", _0x10664c);
                        const {
                          exec: _0x1b7f8f
                        } = require('child_process');
                        _0x1b7f8f("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x5698fe);
            _0x13988c();
          }
        }
      }
    });
    _0x313b00.ev.on("creds.update", _0xeff6e0);
    _0x313b00.downloadAndSaveMediaMessage = async (_0x98ed78, _0x303d72 = '', _0x5a6d12 = true) => {
      let _0x1c703c = _0x98ed78.msg ? _0x98ed78.msg : _0x98ed78;
      let _0x4b9143 = (_0x98ed78.msg || _0x98ed78).mimetype || '';
      let _0x83e4a6 = _0x98ed78.mtype ? _0x98ed78.mtype.replace(/Message/gi, '') : _0x4b9143.split('/')[0x0];
      0x0;
      const _0x1f695d = await baileys_1.downloadContentFromMessage(_0x1c703c, _0x83e4a6);
      let _0x548e11 = Buffer.from([]);
      for await (const _0x32153f of _0x1f695d) {
        _0x548e11 = Buffer.concat([_0x548e11, _0x32153f]);
      }
      let _0x10782d = await FileType.fromBuffer(_0x548e11);
      let _0xbd0b21 = './' + _0x303d72 + '.' + _0x10782d.ext;
      await fs.writeFileSync(_0xbd0b21, _0x548e11);
      return _0xbd0b21;
    };
    _0x313b00.awaitForMessage = async (_0x2097da = {}) => {
      return new Promise((_0x5b0ad7, _0x539467) => {
        if (typeof _0x2097da !== 'object') {
          _0x539467(new Error("Options must be an object"));
        }
        if (typeof _0x2097da.sender !== "string") {
          _0x539467(new Error("Sender must be a string"));
        }
        if (typeof _0x2097da.chatJid !== "string") {
          _0x539467(new Error("ChatJid must be a string"));
        }
        if (_0x2097da.timeout && typeof _0x2097da.timeout !== "number") {
          _0x539467(new Error("Timeout must be a number"));
        }
        if (_0x2097da.filter && typeof _0x2097da.filter !== "function") {
          _0x539467(new Error("Filter must be a function"));
        }
        const _0x3cbc28 = _0x2097da?.["timeout"] || undefined;
        const _0x45cb71 = _0x2097da?.["filter"] || (() => true);
        let _0x198452 = undefined;
        let _0x5d3fcb = _0x5552f5 => {
          let {
            type: _0x2c1d8a,
            messages: _0x188f1e
          } = _0x5552f5;
          if (_0x2c1d8a == "notify") {
            for (let _0x596616 of _0x188f1e) {
              const _0x568f56 = _0x596616.key.fromMe;
              const _0xfb234a = _0x596616.key.remoteJid;
              const _0x20ea32 = _0xfb234a.endsWith("@g.us");
              const _0xcecad2 = _0xfb234a == "status@broadcast";
              const _0x4e39a4 = _0x568f56 ? _0x313b00.user.id.replace(/:.*@/g, '@') : _0x20ea32 || _0xcecad2 ? _0x596616.key.participant.replace(/:.*@/g, '@') : _0xfb234a;
              if (_0x4e39a4 == _0x2097da.sender && _0xfb234a == _0x2097da.chatJid && _0x45cb71(_0x596616)) {
                _0x313b00.ev.off("messages.upsert", _0x5d3fcb);
                clearTimeout(_0x198452);
                _0x5b0ad7(_0x596616);
              }
            }
          }
        };
        _0x313b00.ev.on("messages.upsert", _0x5d3fcb);
        if (_0x3cbc28) {
          _0x198452 = setTimeout(() => {
            _0x313b00.ev.off("messages.upsert", _0x5d3fcb);
            _0x539467(new Error("Timeout"));
          }, _0x3cbc28);
        }
      });
    };
    return _0x313b00;
  }
  let _0x18a530 = require.resolve(__filename);
  fs.watchFile(_0x18a530, () => {
    fs.unwatchFile(_0x18a530);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x18a530];
    require(_0x18a530);
  });
  _0x13988c();
}, 0x1388);