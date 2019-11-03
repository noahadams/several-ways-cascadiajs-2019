// the Literal
const client = {
  token: "",
  baseURL: "https://api.github.com/",
  repo: function(owner, name) {
    const headers = this.token ? { Authorization: "token ${this.token}" } : {};
    return fetch(`${this.baseURL}repos/${owner}/${name}`, { headers }).then(
      res => res.json()
    );
  }
};

alert(JSON.stringify(await client.repo("tc39", "proposals")));

// _The Constructor and Prototype_

const Client = function(baseURL = "https://api.github.com/", token = "") {
  [this.baseURL, this.token] = [baseURL, token];
};

Client.prototype.repo = function(owner, name) {
  const headers = this.token ? { Authorization: "token ${this.token}" } : {};
  return fetch(`${this.baseURL}repos/${owner}/${name}`, { headers }).then(res =>
    res.json()
  );
};

const client = new Client();
alert(JSON.stringify(await client.repo("tc39", "proposals")));

// ## _The Constructor OR Factory and Prototype_

const Client = function(baseURL = "https://api.github.com/", token = "") {
  if (!(this instanceof Client)) {
    return new Client(baseURL, token);
  }
  [this.baseURL, this.token] = [baseURL, token];
};

Client.prototype.repo = function(owner, name) {
  const headers = this.token ? { Authorization: "token ${this.token}" } : {};
  return fetch(`${this.baseURL}repos/${owner}/${name}`, { headers }).then(res =>
    res.json()
  );
};

alert(JSON.stringify(await Client().repo("tc39", "proposals")));

// ## _The Constructor sans Prototype_

const Client = function(baseURL = "https://api.github.com/", token = "") {
  [this.baseURL, this.token] = [baseURL, token];
  this.repo = function(owner, name) {
    const headers = this.token ? { Authorization: "token ${this.token}" } : {};
    return fetch(`${this.baseURL}repos/${owner}/${name}`, { headers }).then(
      res => res.json()
    );
  };
};

const client = new Client();
alert(JSON.stringify(await client.repo("tc39", "proposals")));

// _The JSON.parse() and merge_
const Client = Object.assign(
  {},
  JSON.parse(
    '"baseURL":"https://api.github.com/", "token": "arealgithubtoken"}'
  ),
  {
    repo: function(owner, name) {
      const headers = this.token
        ? { Authorization: "token ${this.token}" }
        : {};
      return fetch(`${this.baseURL}repos/${owner}/${name}`, { headers }).then(
        res => res.json()
      );
    }
  }
);

const client = new Client();
alert(JSON.stringify(await client.repo("tc39", "proposals")));

// _The Object Constructor and Clobber_

const client = new Object();
client.baseURL = "https://api.github.com/";
client.token = "";
client.repo = function(owner, name) {
  const headers = this.token ? { Authorization: "token ${this.token}" } : {};
  return fetch(`${this.baseURL}repos/${owner}/${name}`, { headers }).then(res =>
    res.json()
  );
};

alert(JSON.stringify(await client.repo("tc39", "proposals")));

// _The `Object.create()`_

const client = Object.create(null);

client["baseURL"] = "https://api.github.com/";
client["token"] = "";
client["repo"] = function(owner, name) {
  const headers = this.token ? { Authorization: "token ${this.token}" } : {};
  return fetch(`${this.baseURL}repos/${owner}/${name}`, { headers }).then(res =>
    res.json()
  );
};

alert(JSON.stringify(await client.repo("tc39", "proposals")));

// _The Factory and Closure_

const clientFactory = (baseURL = "https://api.github.com/", token = "") => ({
  repo: (owner, name) => {
    const headers = this.token ? { Authorization: "token ${this.token}" } : {};
    return fetch(`${this.baseURL}repos/${owner}/${name}`, { headers }).then(
      res => res.json()
    );
  }
});

// _The ES2015 Class_

class Client {
  constructor(baseURL = "https://api.github.com/", token = "") {
    [this.baseURL, this.token] = [baseURL, token];
  }
  repo(owner, name) {
    const headers = this.token ? { Authorization: "token ${this.token}" } : {};
    return fetch(`${this.baseURL}repos/${owner}/${name}`, { headers }).then(
      res => res.json()
    );
  }
}

const client = new Client();
alert(JSON.stringify(await client.repo("tc39", "proposals")));

//_The ES6 Class Factory_

const clientClassFactory = (properties, repo) => {
  return class {
    constructor(...args) {
      properties.map((p, i) => (this[p] = args[i]));
    }
    repo(...args) {
      return repo.apply(this, args);
    }
  };
};

const Client = clientClassFactory(["baseURL", "key"], function(owner, name) {
  const headers = this.token ? { Authorization: "token ${this.token}" } : {};
  return fetch(`${this.baseURL}repos/${owner}/${name}`, { headers }).then(res =>
    res.json()
  );
});

const client = new Client();
alert(JSON.stringify(await client.repo("tc39", "proposals")));

// _The Enterprise Calibre Builder_
class Client {
  constructor(baseURL, token) {
    [this.baseURL, this.token] = [baseURL, token];
  }
  repo(owner, name) {
    const headers = this.token ? { Authorization: "token ${this.token}" } : {};
    return fetch(`${this.baseURL}repos/${owner}/${name}`, { headers }).then(
      res => res.json()
    );
  }
}

class ClientBuilderError extends Error {}

class ClientBuilder {
  constructor() {}
  setBaseURL(baseURL) {
    this.baseURL = baseURL;
    return this;
  }
  setToken(token) {
    this.token = token;
  }
  build() {
    if (!this.baseURL) {
      throw new ClientBuilderError("baseURL not set");
    }
    if (!this.token) {
      throw new ClientBuilderError("token not set");
    }
    return new Client();
  }
}

const client = new ClientBuilder()
  .setBaseURL("https://api.github.com/")
  .setToken()
  .build();
alert(JSON.stringify(await client.repo("tc39", "proposals")));

// _The Function Factory_
const Client = (baseURL = "https://api.github.com/", token = "") => (
  owner,
  name
) => {
  const headers = token ? { Authorization: `token ${token}` } : {};
  return fetch(`${baseURL}repos/${owner}/${name}`, { headers }).then(res =>
    res.json()
  );
};

// _`Function.bind()`_

const repos = (baseURL, token, owner, name) => {
  const headers = token ? { Authorization: `token ${token}` } : {};
  return fetch(`${baseURL}repos/${owner}/${name}`, { headers }).then(res =>
    res.json()
  );
};

const myrepos = repos.bind("https://api.github.com/", "");

alert(JSON.stringify(await myrepos("tc39", "proposals")));
