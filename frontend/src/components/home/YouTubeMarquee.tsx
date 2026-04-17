import React, { useEffect, useState } from 'react';
import { youtubeAPI } from '../../services/api';
import './YouTubeMarquee.css';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
}

const YouTubeMarquee: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await youtubeAPI.getLatestVideos();
        if (response.data.success) {
          setVideos(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section className="youtube-marquee-section">
        <div className="container">
          <div className="section-header">
            <div className="skeleton title-skeleton"></div>
            <div className="skeleton subtitle-skeleton"></div>
          </div>
        </div>
        <div className="marquee-container">
          <div className="marquee-content">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="video-card skeleton-card">
                <div className="thumbnail-wrapper skeleton"></div>
                <div className="video-info">
                  <div className="skeleton line-skeleton"></div>
                  <div className="skeleton line-skeleton short"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  // Duplicate videos for seamless marquee effect
  const marqueeVideos = [...videos, ...videos, ...videos];

  return (
    <section className="youtube-marquee-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Latest from Haven Homes</h2>
          <p className="section-subtitle">Stay updated with our newest property walkthroughs and real estate insights</p>
        </div>
      </div>

      <div className="marquee-container">
        <div className="marquee-content">
          {marqueeVideos.map((video, index) => (
            <a 
              key={`${video.id}-${index}`} 
              href={video.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="video-card"
            >
              <div className="thumbnail-wrapper">
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                <div className="play-overlay">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubeMarquee;
