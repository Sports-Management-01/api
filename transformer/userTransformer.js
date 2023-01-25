const userTransformer = (user)=>{
    if(user?.dataValues?.password)
    {
        delete user.dataValues.password
    }
    if(user?.image){
        user.image = process.env.siteURL + '/uploads/'+ user.image
    }
    return user
};

const userTransformers = (users)=>{
    return users.map((user)=>{
        userTransformer(user)
    });
};
module.exports = 
{
    userTransformer,
    userTransformers
};