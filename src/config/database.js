// Tenho em mente que dados como estes, deveriam estar no '.env',
// porem, como este é um projeto de avaliação, decidi deixar aqui mesmo para
// facilitar os testes.

// module.exports = {
//   dialect: 'postgres',
//   host: 'localhost',
//   username: 'postgres',
//   password: 'docker',
//   database: 'vuttr',
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };

module.exports = {
  dialect: 'postgres',
  host: 'vuttr.cuyoxdhpuzex.us-east-1.rds.amazonaws.com',
  username: 'mastervuttr',
  password: 'databasevuttr',
  database: 'vuttr',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
