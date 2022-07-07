const firstNamesMale = ["James", "Robert", "John", "Michael", "David", "William", "Richard", "Joseph", "Thomas", "Charles", "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin", "Brian", "George", "Timothy", "Ronald", "Edward", "Jason", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon", "Benjamin", "Samuel", "Gregory", "Alexander", "Frank", "Patrick", "Raymond", "Jack", "Dennis", "Jerry", "Tyler", "Aaron", "Jose", "Adam", "Nathan", "Henry", "Douglas", "Zachary", "Peter", "Kyle", "Ethan", "Walter", "Noah", "Jeremy", "Christian", "Keith", "Roger", "Terry", "Gerald", "Harold", "Sean", "Austin", "Carl", "Arthur", "Lawrence", "Dylan", "Jesse", "Jordan", "Bryan", "Billy", "Joe", "Bruce", "Gabriel", "Logan", "Albert", "Willie", "Alan", "Juan", "Wayne", "Elijah", "Randy", "Roy", "Vincent", "Ralph", "Eugene", "Russell", "Bobby", "Mason", "Philip", "Louis"];

const firstNamesFemale = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Lisa", "Nancy", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle", "Carol", "Amanda", "Dorothy", "Melissa", "Deborah", "Stephanie", "Rebecca", "Sharon", "Laura", "Cynthia", "Kathleen", "Amy", "Angela", "Shirley", "Anna", "Brenda", "Pamela", "Emma", "Nicole", "Helen", "Samantha", "Katherine", "Christine", "Debra", "Rachel", "Carolyn", "Janet", "Catherine", "Maria", "Heather", "Diane", "Ruth", "Julie", "Olivia", "Joyce", "Virginia", "Victoria", "Kelly", "Lauren", "Christina", "Joan", "Evelyn", "Judith", "Megan", "Andrea", "Cheryl", "Hannah", "Jacqueline", "Martha", "Gloria", "Teresa", "Ann", "Sara", "Madison", "Frances", "Kathryn", "Janice", "Jean", "Abigail", "Alice", "Julia", "Judy", "Sophia", "Grace", "Denise", "Amber", "Doris", "Marilyn", "Danielle", "Beverly", "Isabella", "Theresa", "Diana", "Natalie", "Brittany", "Charlotte", "Marie", "Kayla", "Alexis", "Lori"];

const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzales", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez", "Wood", "James", "Bennet", "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez"];

const emailProviders = ["gmail.com", "protonmail.com", "outlook.com", "yahoo.com", "aol.com", "hotmail.com", "rediff.com", "google.com", "appsmith.com"];

const alphaNum = "abcdef0123456789";

function generateRandomUser(firstNames, lastNames) {
    const flen = firstNames.length;
    const llen = lastNames.length;
    const fi = Math.floor(Math.random() * flen);
    const li = Math.floor(Math.random() * llen);
    const first = firstNames[fi];
    const last = lastNames[li];

    const elen = emailProviders.length;
    const email = generateEmails(first.toLowerCase())[Math.floor(Math.random() * elen)];
    const user_id = generateRandomId();
    const role_id = generateRandomId();
    return { full: `${first} ${last}`, first, last, email, user_id, role_id };
}

function generateRandomUsers(count = 100) {
    const half = Math.floor(count / 2);
    const firstNames = [...firstNamesFemale.slice(0, half), ...firstNamesMale.slice(0, half)];
    return Array(count).fill(0).map(_ => generateRandomUser(firstNames, lastNames));
}

function generateRandomId(size = 16) {
    const len = alphaNum.length;
    return Array(size).fill(0).map(_ => alphaNum[Math.floor(Math.random() * len)]).join("");
}

function generateRandomIds(count = 100) {
    return Array(count).fill(0).map(_ => generateRandomId());
}

function generateIpv4() {
    return Array(4).fill(0).map(_ => Math.floor(Math.random() * 256)).join(".");
}

function generateIpv6() {
    const len = alphaNum.length;
    return Array(8).fill(0).map(_ => Array(4).fill(0).map(_ => alphaNum[Math.floor(Math.random() * len)]).join("")).join(".");
}

function generateIps() {
    return Array(100).fill(0).map((_, i) => i & 1 ? generateIpv4() : generateIpv6());
}

function generateEmails(name) {
    return emailProviders.map(email => `${name}@"${email}`);
}

function generateEvent({ full, first, last, email, user_id, role_id }) {
    return ({
        user_id,
        user: { full, first, last, email, user_id, role_id },
        event_id: generateRandomId(32),
        log_id: generateRandomId(24),
        user_ip: generateIpv4(),
        allowed: (Math.floor(Math.random() * 32) & 1) === 1,
        event_ts: Date.now(),
        workspace_id: generateRandomId(),
        app_id: generateRandomId(8)
    });
}

function generateEvents(count = 100) {
    return generateRandomUsers(count).map(generateEvent);
}

function generateIds() {
    return ({
        userIds: generateRandomIds(),
        applicationIds: generateRandomIds(),
        workspaceIds: generateRandomIds(),
        resourceIds: generateRandomIds(),
        datasourceIds: generateRandomIds(),
        ips: generateIps(),
        pageIds: generateRandomIds()
    });
}

const events = generateEvents(10000);

events.map(e => `("${e.log_id}", "${e.event_id}", "${e.app_id}", "${e.event_ts}", "${Date.now()}", "${e.user_id}", "${e.user_ip}", "${e.workspace_id}", "${e.allowed}", "${e.user.email}", "${e.user.full}", "${e.user.first}", "${e.user.role_id}", "${e.user.last}")`);

