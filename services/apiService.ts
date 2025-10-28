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

export const submitClaim = (postId: string, description: string): Promise<Claim> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newClaim: Claim = {
        id: `claim-${Date.now()}`,
        postId,
        claimerDescription: description,
        claimerUid: 'current-user-mock-id', // Mocked user ID
        adminDecision: 'pending',
        createdAt: new Date().toISOString(),
      };
      mockClaims.push(newClaim);
      console.log("New claim submitted:", newClaim);
      resolve(newClaim);
    }, SIMULATED_DELAY);
  });
};
