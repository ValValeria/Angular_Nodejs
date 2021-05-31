const Sequelize:any = require("sequelize");

const sequelize:any = new Sequelize("******", "*****", "******", {
    dialect: "mysql",
    host: "remotemysql.com",
    port:3306,
    define: {
      timestamps: false
    }
});

const Post:any = sequelize.define("post", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING(2000),
      allowNull: false
    },
    img: {
      type: Sequelize.STRING,
      allowNull: false
    },
    categories: {
      type: Sequelize.STRING,
      allowNull: false
    },
    excerpt: {
      type: Sequelize.STRING,
      allowNull: false
    },
});

const Comment:any = sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
});

Post.hasMany(Comment);
Comment.belongsTo(Post)

sequelize.sync().then(()=>{
 }).catch(err=>console.log(err));

 export {Post,Comment as Com};
