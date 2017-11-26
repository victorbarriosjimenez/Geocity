export class Post { 
    public userId?: string;
    public body?: string;
    public timestamp?: any;
    public authorProfilePhoto?: string;
    public authorUsername?: string; 
    public showCommentForm?: boolean;
    public comments?: Post[];
}