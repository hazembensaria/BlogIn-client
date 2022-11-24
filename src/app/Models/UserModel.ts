export interface userModel{
    token:string,
    _id:string,
    role : string,
    isnew : boolean,
    name : string ,
    email :string ,
    image  :string,
    age :number ,
    bio :string,
    profession : string,
    followers : Array<string>,
    followings : Array<string>,
    history : Array<string>,
  }
  