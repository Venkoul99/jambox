import { useState, useEffect } from 'react';
import artistApi from '@/api/artist-api';
import { Artist as ArtistType } from '@/types/artist.type';
import ArtistCard from './Card/ArtistCard';
import { useNavigate, useParams } from 'react-router-dom';

export default function SingleArtist() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [artist, setArtist] = useState<ArtistType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const fetchArtists = async () => {
      try {
        const artist = await artistApi.getOne(id);
        artist.isSingle = true;
        setArtist(artist);
      } catch (err) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [id, navigate]);

  if (loading) {
    return <p>Loading article...</p>;
  }

  return (
    <div>
      {artist ? (
        <ArtistCard
          key={artist.id}
          name={artist.name}
          bio={artist.bio}
          shortBio={artist.shortBio}
          image={artist.image}
          id={artist.id}
          isSingle={artist.isSingle}
        />
      ) : null}
    </div>
  );
}
