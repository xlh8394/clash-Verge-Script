// 参考 Verge 示例 Script 配置
//
// Clash Verg Rev Version ≥ 1.7.2
//
// 最后更新时间: 2024-07-03 22:00


// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "text",
  "interval": 86400
};

// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖通用配置
  config["mixed-port"] = "7893";
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = false;
  config["mode"] = "rule";
  config["log-level"] = "info";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";

  // 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": true,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter":[
      "*.lan",
      "*.direct",
      "cable.auth.com",
      "*.msftconnecttest.com",
      "*.msftncsi.com",
      "network-test.debian.org",
      "detectportal.firefox.com",
      "resolver1.opendns.com",
      "*.srv.nintendo.net",
      "*.stun.playstation.net",
      "xbox.*.microsoft.com",
      "*.xboxlive.com",
      "stun.*",
      "global.turn.twilio.com",
      "global.stun.twilio.com",
      "app.yinxiang.com",
      "injections.adguard.org",
      "local.adguard.org",
      "cable.auth.com",
      "localhost.*.qq.com",
      "localhost.*.weixin.qq.com",
      "*.logon.battlenet.com.cn",
      "*.logon.battle.net",
      "*.blzstatic.cn",
      "music.163.com",
      "*.music.163.com",
      "*.126.net",
      "musicapi.taihe.com",
      "music.taihe.com",
      "songsearch.kugou.com",
      "trackercdn.kugou.com",
      "*.kuwo.cn",
      "api-jooxtt.sanook.com",
      "api.joox.com",
      "joox.com",
      "y.qq.com",
      "*.y.qq.com",
      "streamoc.music.tc.qq.com",
      "mobileoc.music.tc.qq.com",
      "isure.stream.qqmusic.qq.com",
      "dl.stream.qqmusic.qq.com",
      "aqqmusic.tc.qq.com",
      "amobile.music.tc.qq.com",
      "*.xiami.com",
      "*.music.migu.cn",
      "music.migu.cn",
      "proxy.golang.org",
      "*.mcdn.bilivideo.cn",
      "*.cmpassport.com",
      "id6.me",
      "open.e.189.cn",
      "mdn.open.wo.cn",
      "opencloud.wostore.cn",
      "auth.wosms.cn",
      "*.jegotrip.com.cn",
      "*.icitymobile.mobi",
      "*.pingan.com.cn",
      "*.cmbchina.com",
      "*.10099.com.cn",
      "pool.ntp.org",
      "*.pool.ntp.org",
      "ntp.*.com",
      "time.*.com",
      "ntp?.*.com",
      "time?.*.com",
      "time.*.gov",
      "time.*.edu.cn",
      "*.ntp.org.cn",
      "PDC._msDCS.*.*",
      "DC._msDCS.*.*",
      "GC._msDCS.*.*"
    ],
    "default-nameserver": ["223.5.5.5", "119.29.29.29"],
    "nameserver": ["223.5.5.5", "119.29.29.29"],
    "nameserver-policy":{
      "geosite:cn": "system",
      "geosite:gfw,geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]
    }
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    "geosite": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    "mmdb": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb"
  };

  // 覆盖 sniffer 配置
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS": {
        "ports": ["443", "8443"]
      },
      "HTTP": {
        "ports": ["80", "8080-8880"],
        "override-destination": true
      },
      "QUIC": {
        "ports": ["443", "8443"]
      }
    }
  };

  // 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mixed",
    "dns-hijack": ["any:53"],
    "auto-route": true,
    "auto-detect-interface": true  
  };

  // 覆盖策略组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "手动切换",
      "type": "select",
      "proxies": ["延迟选优", "故障转移", "DIRECT"],
      "include-all": true,
      "icon": "https://github.com/clash-verge-rev/clash-verge-rev/raw/main/src-tauri/icons/icon.png"
    },
    {
      ...groupBaseOption,
      "name": "延迟选优",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/Speedtest.png"
    },
    {
      ...groupBaseOption,
      "name": "故障转移",
      "type": "fallback",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Auto.png"
    },
    {
      ...groupBaseOption,
      "name": "国外网站",
      "type": "select",
      "proxies": ["手动切换", "延迟选优", "故障转移", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Global.png"
    },
    {
      ...groupBaseOption,
      "name": "国际媒体",
      "type": "select",
      "proxies": ["手动切换", "延迟选优", "故障转移", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/YouTube.png"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["手动切换", "延迟选优", "故障转移", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple_1.png"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["手动切换", "延迟选优", "故障转移", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["手动切换", "延迟选优", "故障转移", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png"
    },
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["手动切换", "延迟选优", "故障转移", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png"
    },
    {
      ...groupBaseOption,
      "name": "推特消息",
      "type": "select",
      "proxies": ["手动切换", "延迟选优", "故障转移", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Twitter.png"
    },
    {
      ...groupBaseOption,
      "name": "AI",
      "type": "select",
      "proxies": ["手动切换", "延迟选优", "故障转移", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
    },    
    {
      ...groupBaseOption,
      "name": "游戏平台",
      "type": "select",
      "proxies": ["手动切换", "延迟选优", "故障转移", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Game.png"
    },    
    {
      ...groupBaseOption,
      "name": "Emby",
      "type": "select",
      "include-all": true,
      "proxies": ["手动切换", "延迟选优", "故障转移", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Emby.png"
    },
    {
      ...groupBaseOption,
      "name": "广告拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Advertising.png"
    },
    {
      ...groupBaseOption,
      "name": "兜底分流",
      "type": "select",
      "proxies": ["手动切换", "延迟选优", "故障转移", "负载均衡(轮询)", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png"
    }
  ];

  // 覆盖规则集
  config["rule-providers"] = {
    "AD": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Reject.list",
      "path": "./rule-providers/AD.list"
    },
    "Apple": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Apple.list",
      "path": "./rule-providers/Apple.list"
    },
    "Google": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Google.list",
      "path": "./rule-providers/Google.list"
    },
    "YouTube": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/YouTube.list",
      "path": "./rule-providers/YouTube.list"
    },
    "Telegram": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Telegram.list",
      "path": "./rule-providers/Telegram.list"
    },
    "Twitter": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Twitter.list",
      "path": "./rule-providers/Twitter.list"
    },
    "Steam": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Steam.list",
      "path": "./rule-providers/Steam.list"
    },
    "Epic": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Epic.list",
      "path": "./rule-providers/Epic.list"
    },
    "AI": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/AI.list",
      "path": "./rule-providers/AI.list"
    },
    "Emby": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Emby.list",
      "path": "./rule-providers/Emby.list"
    },
    "Spotify": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Spotify.list",
      "path": "./rule-providers/Spotify.list"
    },
    "Bahamut": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Bahamut.list",
      "path": "./rule-providers/Bahamut.list"
    },
    "Netflix": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Netflix.list",
      "path": "./rule-providers/Netflix.list"
    },
    "Disney": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Disney.list",
      "path": "./rule-providers/Disney.list"
    },
    "PrimeVideo": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/PrimeVideo.list",
      "path": "./rule-providers/PrimeVideo.list"
    },
    "HBO": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/HBO.list",
      "path": "./rule-providers/HBO.list"
    },
    "OneDrive": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/OneDrive.list",
      "path": "./rule-providers/OneDrive.list"
    },
    "Github": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Github.list",
      "path": "./rule-providers/Github.list"
    },
    "Microsoft": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Microsoft.list",
      "path": "./rule-providers/Microsoft.list"
    },
    "Lan": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/Lan.list",
      "path": "./rule-providers/Lan.list"
    },
    "ProxyGFW": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://github.com/Repcz/Tool/raw/X/Clash/Rules/ProxyGFW.list",
      "path": "./rule-providers/ProxyGFW.list"
    }
  };

  // 覆盖规则
  config["rules"] = [
    "RULE-SET,AD,广告拦截",
    "RULE-SET,AI,AI",
    "RULE-SET,Apple,苹果服务",
    "RULE-SET,YouTube,谷歌服务",
    "RULE-SET,Google,谷歌服务",
    "RULE-SET,Telegram,电报消息",
    "RULE-SET,Twitter,推特消息",
    "RULE-SET,Steam,游戏平台",
    "RULE-SET,Epic,游戏平台",
    "RULE-SET,Emby,Emby",
    "RULE-SET,Spotify,国际媒体",
    "RULE-SET,Bahamut,国际媒体",
    "RULE-SET,Netflix,国际媒体",
    "RULE-SET,Disney,国际媒体",
    "RULE-SET,PrimeVideo,国际媒体",
    "RULE-SET,HBO,国际媒体",
    "GEOSITE,onedrive,微软服务",
    "GEOSITE,github,微软服务",
    "GEOSITE,microsoft,微软服务",
    "GEOSITE,gfw,国外网站",
    "GEOSITE,cn,DIRECT",
    "GEOIP,lan,DIRECT",
    "GEOIP,CN,DIRECT",
    "MATCH,兜底分流"
  ];

  // 返回修改后的配置
  return config;
}
