import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { getCelebrities } from '../../services/celebrityService';
import { updateRecipientLikedStyles, getRecipient } from '../../services/api';
import '../../style.scss';
import './celebrityStyles.css'

const CelebritySwiper: React.FC = () => {
  const { recipientId } = useParams<{ recipientId: string }>();
  const [celebrities, setCelebrities] = useState<any[]>([]);
  const [likedStyles, setLikedStyles] = useState<string[]>([]);
  const [recipient, setRecipient] = useState<any>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAgeCategory = (age: number): string => {
    if (age < 20) return "teen";
    if (age < 40) return "young adult";
    if (age < 60) return "middle aged";
    return "senior";
  };

  useEffect(() => {
    const fetchRecipientData = async () => {
      try {
        const data = await getRecipient(recipientId!);
        setRecipient(data);
      } catch (err) {
        setError('Failed to fetch recipient data');
      }
    };
    fetchRecipientData();
  }, [recipientId]);

  useEffect(() => {
    const fetchCelebrityData = async () => {
      if (!recipient) return;

      try {
        setIsLoading(true);
        const data = await getCelebrities();
        
        const recipientAgeCategory = getAgeCategory(recipient.age);
        // Filter celebrities based on recipient data
        const filteredCelebrities = data.filter((celebrity: any) => {
          if(celebrity.fields["Gender"] === undefined || celebrity.fields["Age"] === undefined) return false;
          return (
            (celebrity.fields["Gender"].includes(recipient.gender) || celebrity.fields.Gender === 'Any') &&
            celebrity.fields["Age"].includes(recipientAgeCategory)
          );
        });
        setCelebrities(filteredCelebrities.reverse());
      } catch (err) {
        setError('Failed to fetch celebrities');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCelebrityData();
  }, [recipient]);

  useEffect(() => {
    if (likedStyles.length >= 5) {
      updateRecipientStyles();
    }
  }, [likedStyles]);

  const updateRecipientStyles = async () => {
    try {
      await updateRecipientLikedStyles(recipientId!, likedStyles);
      navigate(`/catalog/${recipientId}`);
    } catch (error) {
      console.error('Failed to update recipient styles:', error);
      setError('Failed to update recipient styles');
    }
  };

  const onSwipe = (direction: string, celebrityName: string) => {
    if (direction === 'right') {
      setLikedStyles(prevState => [...prevState, celebrityName]);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-2">Which celebrity best matches their style?</h2>
      <p className="text-sm text-gray-600 mb-6">Swipe right on up to 5 celebrities that best match the recipient's style.</p>

      <div className="swiperWrapper">
        <div className="cardContainer">
          {celebrities.map((celebrity) => (
            <TinderCard 
              className='swipe' 
              key={celebrity.fields.CelebrityName}
              onSwipe={(dir) => onSwipe(dir, celebrity.fields.CelebrityName)}
              preventSwipe={['up', 'down']}
            >
              <div 
                style={{ backgroundImage: `url(${celebrity.fields.Image[0].url})` }} 
                className='card'
              >
                <div className="cardContent">
                  <h3>{celebrity.fields.CelebrityName}</h3>
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CelebritySwiper;
