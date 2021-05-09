import axios from "axios";
import OAuth from "oauth-1.0a";
import hmacSHA1 from "crypto-js/hmac-sha1";
import Base64 from "crypto-js/enc-base64";

const getOAuth = () =>
  new OAuth({
    consumer: {
      key: "ck_446bd8b80ee036a16ed0e47f0aa9f1e970533b54",
      secret: "cs_49560a387568fb07baceafaa649a1bf0580ef9e8",
    },
    signature_method: "HMAC-SHA1",
    hash_function: (baseString: string, key: string) =>
      Base64.stringify(hmacSHA1(baseString, key)),
  });

export const config = {
  BASE_URL: "http://studentdocker.informatika.uni-mb.si:20289",
  WC_API_URL: "/wp-json/wc/v3/",
};

export const get = async (path: string) => {
  try {
    const request = {
      url: `${config.BASE_URL}${config.WC_API_URL}${path}`,
      method: "GET",
    };

    const oauth = getOAuth().authorize(request);

    const res = axios.get(request.url, {
      params: oauth,
    });
    return res;
  } catch (err) {
    console.log("greska");
    console.log(err);
  }
};

export const post = async (path: string, body: object): Promise<boolean> => {
  try {
    const request = {
      url: `${config.BASE_URL}${config.WC_API_URL}${path}`,
      method: "POST",
    };

    const oauth = getOAuth().authorize(request);

    axios.post(request.url, body, {
      params: oauth,
    });
    return true;
  } catch (err) {
    console.log("greska");
    console.log(err);
    return false;
  }
};

export const remove = async (path: string) => {
  try {
    const request = {
      url: `${config.BASE_URL}${config.WC_API_URL}${path}`,
      method: "DELETE",
    };

    const oauth = getOAuth().authorize(request);

    axios.delete(request.url, {
      params: oauth,
    });
    return true;
  } catch (err) {
    console.log("greska");
    console.log(err);
    return false;
  }
};

export const update = async (path: string, body: object): Promise<boolean> => {
  try {
    const request = {
      url: `${config.BASE_URL}${config.WC_API_URL}${path}`,
      method: "PUT",
    };

    const oauth = getOAuth().authorize(request);

    axios.put(request.url, body, {
      params: oauth,
    });
    return true;
  } catch (err) {
    console.log("greska");
    console.log(err);
    return false;
  }
};
