async function tts(text, lang, options = {}) {
    const { config, utils } = options;
    const { tauriFetch: fetch, CryptoJS } = utils;

    const URL = "https://dict.youdao.com/pronounce/base";
    const KEYFROM = "webfanyi";
    const KEYID = "voiceFanyiWeb";
    const PRODUCT = "webfanyi";
    const SECRET = "qCG2vdP92hOXDcKa";

    const voiceType = (config && config.voiceType) || "1";

    const params = {
        product: PRODUCT,
        appVersion: 1,
        client: "web",
        mid: 1,
        vendor: "web",
        screen: 1,
        model: 1,
        imei: 1,
        network: "wifi",
        keyfrom: KEYFROM,
        keyid: KEYID,
        mysticTime: Date.now(),
        yduuid: "abcdefg",
        le: lang,
        phonetic: "",
        rate: 4,
        word: text,
        type: voiceType,
        id: "",
    };

    const signParams = {};
    for (const key of Object.keys(params)) {
        if (params[key] !== "" && params[key] !== undefined) {
            signParams[key] = params[key];
        }
    }
    const keys = Object.keys(signParams).sort();
    keys.push("key");
    signParams.key = SECRET;
    const raw = keys.map((key) => `${key}=${signParams[key]}`).join("&");
    const sign = CryptoJS.MD5(raw).toString(CryptoJS.enc.Hex);
    const pointParam = keys.join(",");

    const query = { ...params, sign, pointParam };
    const qs = Object.keys(query)
        .map((key) => `${key}=${encodeURIComponent(query[key])}`)
        .join("&");

    const res = await fetch(`${URL}?${qs}`, {
        method: "GET",
        responseType: 3,
    });

    if (res.ok) {
        if (res.data) {
            return res.data;
        } else {
            throw JSON.stringify(res.data);
        }
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
