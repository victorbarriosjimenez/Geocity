export class Post { 
    public $key?: string;
    public userId?: string;
    public body?: string;
    public timestamp?: any;
    public authorProfilePhoto?: string;
    public authorUsername?: string; 
    public comments?: Comment[];
    public showForm?: boolean;
    public commentText?: string;
}
export class Comment { 
    public userId?: string;
    public postId?: string; 
    public authorId?: string;     
    public body?: string;  
    public timestamp?: any;    
    public authorProfilePhoto?: string;
    public authorUsername?: string;     
}