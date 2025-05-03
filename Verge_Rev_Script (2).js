// 国内DNS服务器
const domesticNameservers = [
  "https://223.5.5.5/dns-query", // 阿里DoH
  "https://doh.pub/dns-query" // 腾讯DoH
];
// 国外DNS服务器
const foreignNameservers = [
  "https://208.67.222.222/dns-query", // OpenDNS
  "https://77.88.8.8/dns-query", //YandexDNS
  "https://1.1.1.1/dns-query", // CloudflareDNS
  "https://8.8.4.4/dns-query", // GoogleDNS  
];
// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": true,
  "prefer-h3": false,
  "respect-rules": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5","1.2.4.8"], //可修改成自己ISP的DNS
  "nameserver": [...foreignNameservers],
  "proxy-server-nameserver":[...domesticNameservers],
  "nameserver-policy": {
    "geosite:private,cn": domesticNameservers
  }
};
// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};
// 规则集配置
const ruleProviders = {
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "path": "./ruleset/loyalsoldier/google.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
  "openai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/openai.yaml",
    "path": "./ruleset/MetaCubeX/openai.yaml"
  },
  "pikpak": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/pikpak.yaml",
    "path": "./ruleset/MetaCubeX/pikpak.yaml"
  },
  "anthropic": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/anthropic.yaml",
    "path": "./ruleset/MetaCubeX/anthropic.yaml"
  },
  "google-gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/google-gemini.yaml",
    "path": "./ruleset/MetaCubeX/google-gemini.yaml"
  },
  "xai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/xai.yaml",
    "path": "./ruleset/MetaCubeX/xai.yaml"
  },
  "perplexity": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/perplexity.yaml",
    "path": "./ruleset/MetaCubeX/perplexity.yaml"
  },
  "microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/microsoft.yaml",
    "path": "./ruleset/MetaCubeX/microsoft.yaml"
  },
};
// 规则
const rules = [
  // 自定义规则
  "DOMAIN-SUFFIX,googleapis.cn, 节点选择", // Google服务
  "DOMAIN-SUFFIX,gstatic.com, 节点选择", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com, 节点选择", // Google Play下载服务
  "DOMAIN-SUFFIX,github.io, 节点选择", // Github Pages
  "DOMAIN,v2rayse.com, 节点选择", // V2rayse节点工具
  // MetaCubeX 规则集
  "RULE-SET,openai, ChatGPT-Gemini-XAI-Perplexity",
  "RULE-SET,pikpak, PikPak",
  "RULE-SET,anthropic, Claude",
  "RULE-SET,google-gemini, ChatGPT-Gemini-XAI-Perplexity",
  "RULE-SET,xai, ChatGPT-Gemini-XAI-Perplexity",
  "RULE-SET,perplexity, ChatGPT-Gemini-XAI-Perplexity",
  // Loyalsoldier 规则集
  "RULE-SET,applications, 全局直连",
  "RULE-SET,private, 全局直连",
  "RULE-SET,reject, 广告过滤",
  "RULE-SET,microsoft, 微软服务",
  "RULE-SET,icloud, 苹果服务",
  "RULE-SET,apple, 苹果服务",
  "RULE-SET,google, 谷歌服务",
  "RULE-SET,proxy, 节点选择",
  "RULE-SET,gfw, 节点选择",
  "RULE-SET,tld-not-cn, 节点选择",
  "RULE-SET,direct, 全局直连",
  "RULE-SET,lancidr, 全局直连,no-resolve",
  "RULE-SET,cncidr, 全局直连,no-resolve",
  "RULE-SET,telegramcidr, 电报消息,no-resolve",
  // 其他规则
  "GEOIP,LAN, 全局直连,no-resolve",
  "GEOIP,CN, 全局直连,no-resolve",
  "MATCH, 漏网之鱼"
];
// 代理组通用配置
const groupBaseOption = {
  "interval": 0,
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

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "节点选择",
      "type": "select",
      "proxies": ["延迟选优"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "延迟选优",
      "type": "url-test",
      "tolerance": 50,
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Speedtest.png"
    },
    {
      ...groupBaseOption,
      "name": "国外媒体",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ForeignMedia.png"
    },
    {
      ...groupBaseOption,
      // "url": "https://chatgpt.com",
      // "expected-status": "200",
      "name": "ChatGPT-Gemini-XAI-Perplexity",
      "type": "select",
      "include-all": true,
      "exclude-filter": "(?i)港|hk|hongkong|hong kong|俄|ru|russia|澳|macao",
      "icon": "https://github.com/shindgewongxj/WHATSINStash/raw/main/icon/anthropic.png"
    },
    {
      ...groupBaseOption,
      "name": "Claude",
      "type": "select",
      "proxies": ["节点选择", "全局直连", "延迟选优"],
      "include-all": true,
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAoxJREFUOE9dk01I1GEQxp/n/a+7uYlSZGFUICbuFqnVoSKIuhQhHTqsm30QURhBHxa6UnRYMqKtICgKokvQIVePQZFISCFBuKe+VsVLQWaSUKu5bv//+4SRttuc3pl3fgwzzwyRZ+n26AlJl3x+bq6+nByRwKFY420fzYOqa50D+bmzb+YHBtuizTK4J+hmONF1bqA9UlYifhHRGE50PU5fPFQpN7s4fLU7NQ+/aYtWLVjoG8e3iRm7oPSlqLXW566W5xT5ZEbgmHX65c7AsB/g9GhwrGZHvM+l4nEz+PNDClDQgof99IwL54WghGN93Zbu8xkbCAVMrodEncQzoWudt+YrD1+IbvBcdAKoMESrrN0tchvJFnnYT6MJkE1WfBQKhg4yHrcFPQ/E9wRLpoNXIJy01JADhgH7TjArAZRCGvGCql8b755UV8RJpVDC4fORcr+K3PGJzExmeSZXkS3fBsu7JGvyhykPz+hgVBbrBKwm0c/3scgTh1gFC4jGJZSh5MqY7XOwJCsyDbCfYK9jber797KPnNUS3RGT6l1kygKfDANLyjyT6wDRnAf/hPQaYJ1Il8BnSV3zOg+f2h2wC0uPWqHViK8Bu1FkMYVlFnAMcD8LX4dfbj3J9aKd/gMPxw6s8JhLEqyAwTl5aCAIT6o1Bn0Aj1P2paWZzHn+Y3U3Hk79k+p8ZIvrcZefupmz2AvirBV2EXxlmK0FivsIfJT0SsQOXzATrY4//VGwnum2xq0gHolqoJAT2Rsq/lo5OLV0E4gewDQRmPKsxtbcSL4thGPRyxJehK8ne9KxfUcN1FKdSNaSQLo9epqgW5PovDM3yAL476Fo9nOorbFJhjtrEskj/1/TnP8bpRow8ar7nqUAAAAASUVORK5CYII="
    },
    {
      ...groupBaseOption,
      "name": "PikPak",
      "type": "select",
      "proxies": ["节点选择", "全局直连", "延迟选优"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google_Search.png"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Apple.png"
    },
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      ...groupBaseOption,
      "name": "广告过滤",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/adguard.png"
    },
    {
      ...groupBaseOption,
      "name": "全局直连",
      "type": "select",
      "proxies": ["DIRECT", "节点选择"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
    },
    {
      ...groupBaseOption,
      "name": "自定义直连",
      "type": "select",
      "include-all": true,
      "proxies": ["全局直连", "节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/unknown.svg"
    },
    {
      ...groupBaseOption,
      "name": "自定义代理",
      "type": "select",
      "include-all": true,
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/openwrt.svg"
    },
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  config["proxies"].forEach(proxy => {
    // 为每个节点设置 udp = true
    proxy.udp = true

  })
  // 返回修改后的配置
  return config;
}
