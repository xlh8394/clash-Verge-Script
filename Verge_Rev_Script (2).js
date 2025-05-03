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
  "RULE-SET,openai, AI",
  "RULE-SET,anthropic, Claude",
  "RULE-SET,google-gemini, AI",
  "RULE-SET,xai, AI",
  "RULE-SET,perplexity, AI",
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
      "name": "AI",
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
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAABlxJREFUSEuFlnuMVVcVxr9vnXPvuXeGYYYB0s6DTjudqQOEV1pMXypa/9CIJtrOVBOM9UViUjD+QQs0sTcxVQrVJr4STGqtFayOVpPG1qbUVtoYaSEN2jI8Zui0ApkBBmYYmMe9Z69Pz0WQQhP3Hyc5Z5+zfmd/a61vb+KycWhD94Lg9hHBvySxEsdaQ+Fo5/d6T0jg4fXd84LsXriORGZ/88noYOePtp25PM6l97x88uB9d88H8eEg3AuilvLHzLjrhk2/3fF26Z5CeWpykUL4GWV7Leb2lOU950bmnknmjDcWqTxZKZyOy0dvKj0zcSF2FbJ79epcsfk0FyxA6H/drhW01M3uE9RC4VUXdkyM1T+BWadrahktsxCeErlLxp8kZnsr0wjMcSmlYqAX8mY727/76+MAlMWvQt5a1321hyhXmBmNhYnx6oRQ831TuFXg1QB+l89NPVhhEiO1xXA+SdMLtPg70uQU0rjdiU0O1ABIHfjGvkH9vae3N1QhArh/3d2fAtAMeFnikXJQXzFmj8CbZFop10uI+GNKwwzWTmqrg89T+RKscqPBFzvwdYmjoA66hVJv4fd7SyX4eUipZAcm+34q+S0Ek6DwVzJ+PBc5FdTljH4AYkDS8wB2ElE9PGwR8FxZybcTlDfBdBvA60HfBUW/iXP4Q8dDT/3rYk6ylfSt77kjBpfJfZW7CYaxiPoTxbJLn3aojmDBDL908ByC94B2QtQ+o+6COMfBA0a8GNLoiWJdfvi60i+m3pP4/gc+Py8IN3jQ1xTUakQrDH8x4UwAOgm0gGqHuJ3EKaW8BeaEMI2ISyCWU+DpCHilq2b+H/FgqZrX3p5uu5j4TLL+xl05nirUlyfj5SauFHgHoEZRxwnOpNhM+CEB5awYSCQQE1AnHdorYm3kdcNdm38+nsXb03QsmjEwVBitqSOz2k9H6qrksdmD0cyJmraUWELoY4DaALQQnM2syqQREQHiDEA5kDkF9UPabxEfI60SpMTAWocbwHEZxUMbuucWEoR0tOIjE6E8Xh53XIu0dWr2ohS2BI61BjaDvOr9ulrBd1MY8thOUWqA2CKqWaLT/C3KUvat69kCQ70F5AU4jC7ITcyBKMLVIrKZhvZLIcpGtdHY7+CwqP5YGCFs2OEnBYwZoiOCewb5IYlGI/IenDRzBYoRyhIi0mdBuAZmCy+FuCQKwYl3IBuJLByRbEj/yQCkwyaeCG7v5iIG7n/4M3XJpEU2VcOJ8dgwE7ByhXGc1pQRtVrQF2BaCvL298glpS5UCBwQNM3sR0CJrAA4CWoI0qsQysyc9UK5LQSipC1tCFG+CWRX1QVcCwR1glhG0UREkBKC7oKb9JqAIRKjDuYh1YCZAswMsk/ycNGFM1j/2k/mvWZmF4jbArybbnNIHKC8Ac42GRIBSSQ2OBE5YISeNdju1OJfSZXayDGPRAeA2qpNkapCBu7vrq+EuA1WXgWLmg1qcdlrBM6pKgMKIApyb8lyTbN3IbWKWEzX6yCPKssNozdjt1dSCzHTQFc4713ZZd/GVU309AOmsAZAUYKM9ueUmGSq22mYJHnc3W8WYGZ8QUBWCJ/IegTkiINjkbBXjF+Mi3inA51nWSr9D/L2hju7pjxqM+HmTLU45c5KzrP9oUvQZwnbOe3amgc3C6oJrKyNkfsQad+EY9gMJ911QJbJ6G058y0zkvI/m0rPTBI4L9fgxs81nQtsZAYCxiAdg+EuuV+jCME8+kcw7WDAo7DqSr+Sj6KuNNWdZj7flVUUnwWU5WxuHNvTRDi8LVk4UiqV/IrtN9vAoqpta2MAihbhAXc/E8lSGTdLytHSLzIkCeTXUdgEapYjfkgIYxFtOkinc8DYG4M+mG1cV0D67u9eJOfHjVRwnbRc5TlDYa4rLITjy+aazs+ofHUQo1MNow2FYj65B0QTiQE4B9JKeCPK1VVqK+Np66O9UxflurTJstOKB1tB2KFQSYeG6k/0NU3MvR6wW+m+0iM7GxfjNZ2lbePZd/s39qxg4FWCeUwOdGzavudyj7tiJS+VVsRnj9Xl25sL6XGc8I+WXk7713d3eIoPwmy5Q+PTnjy85JEnz1XPAltX5/rfTAzoR8fsycDSy+n/hfz3hQxetf/qQeNb3R25mMtF3ghofMqTRy5A3s+ZL3/2b/zecz86FuDcAAAAAElFTkSuQmCC"
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
