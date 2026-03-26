const bcrypt = require("bcrypt");

(async () => {
  const hash = await bcrypt.hash("hashedPass", 10);
  console.log(hash);
})();
