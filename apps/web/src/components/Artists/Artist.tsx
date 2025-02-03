import { useState, useEffect } from 'react';
import artistApi from '@/api/artist-api';
import { Artist as ArtistType } from '@/types/artist.type';
import ArtistCard from './Card/ArtistCard';

export default function Artist() {
  const [artists, setArtists] = useState<ArtistType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const result = await artistApi.getAll();
        setArtists(result);
      } catch (err) {
        setError('Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return <p>Loading articles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {artists.map((artist) => (
        <ArtistCard key={artist.id} id={artist.id} name={artist.name} bio={artist.bio} shortBio={artist.shortBio} image={artist.image} isSingle={false} />
      ))}
    </div>
  );
}
