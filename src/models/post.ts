export class Post { 
    public userId?: string;
    public body?: string;
    public timestamp?: any;
    public authorProfilePhoto?: string;
    public authorUsername?: string; 
}
export class Comment { 
    public userId?: string;
    public postId?: string; 
    public body?: string;  
    public timestamp?: any;    
    public authorProfilePhoto?: string;
    public authorUsername?: string;     
}