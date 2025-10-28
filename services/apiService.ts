import { LostFoundPost, PostType, PostStatus, Claim } from '../types';
import { mockPosts, mockClaims } from './mockData';

let posts: LostFoundPost[] = [...mockPosts];

const SIMULATED_DELAY = 500; // in ms

export const fetchPosts = (filter?: { type?: PostType, search?: string }): Promise<LostFoundPost[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      let filteredPosts = posts;
      if (filter?.type) {
        filteredPosts = filteredPosts.filter(p => p.type === filter.type);
      }
      if (filter?.search) {
        const searchTerm = filter.search.toLowerCase();
        filteredPosts = filteredPosts.filter(p => 
          p.title.toLowerCase().includes(searchTerm) || 
          p.details.toLowerCase().includes(searchTerm) ||
          p.location.toLowerCase().includes(searchTerm)
        );
      }
      resolve(filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, SIMULATED_DELAY);
  });
};

export const fetchPost = (id: string): Promise<LostFoundPost | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(posts.find(p => p.id === id));
    }, SIMULATED_DELAY);
  });
};

export const createPost = (postData: Omit<LostFoundPost, 'id' | 'createdAt' | 'status'>): Promise<LostFoundPost> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newPost: LostFoundPost = {
        ...postData,
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        status: PostStatus.Pending, // In a real app, 'found' items might need admin approval
        posterUid: 'current-user-mock-id' // Mocked user ID
      };
      posts = [newPost, ...posts];
      resolve(newPost);
    }, SIMULATED_DELAY);
  });
};

export const submitClaim = (postId: string, description: string, claimerEmail: string, claimerName: string): Promise<Claim> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newClaim: Claim = {
        id: `claim-${Date.now()}`,
        postId,
        claimerDescription: description,
        claimerUid: claimerEmail,
        claimerEmail: claimerEmail,
        claimerName: claimerName,
        adminDecision: 'pending',
        createdAt: new Date().toISOString(),
      };
      mockClaims.push(newClaim);
      
      // Update the post with the claim
      const postIndex = posts.findIndex(p => p.id === postId);
      if (postIndex > -1) {
        if (!posts[postIndex].claims) {
          posts[postIndex].claims = [];
        }
        posts[postIndex].claims!.push(newClaim);
      }
      
      console.log("New claim submitted:", newClaim);
      resolve(newClaim);
    }, SIMULATED_DELAY);
  });
};

export const acceptClaim = (postId: string, claimId: string): Promise<LostFoundPost> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const postIndex = posts.findIndex(p => p.id === postId);
      if (postIndex > -1) {
        // Update claim status
        const claim = posts[postIndex].claims?.find(c => c.id === claimId);
        if (claim) {
          claim.adminDecision = 'accepted';
        }
        // Update post status to Claimed
        posts[postIndex].status = PostStatus.Claimed;
        resolve(posts[postIndex]);
      } else {
        reject(new Error("Post not found"));
      }
    }, SIMULATED_DELAY);
  });
};
