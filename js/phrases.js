export const phrases = [
  // Level 1: Obvious
  [
    { text: 'The sun rises in the', probable: 'east', improbable: 'microwave' },
    { text: 'Birds can', probable: 'fly', improbable: 'type' },
    { text: 'Fish live in the', probable: 'water', improbable: 'desert' },
    { text: 'Grass is usually', probable: 'green', improbable: 'purple' },
    { text: 'Rain falls from the', probable: 'sky', improbable: 'floor' },
    { text: 'Cats like to', probable: 'purr', improbable: 'bark' },
    { text: 'Ice is', probable: 'cold', improbable: 'hot' },
    { text: 'Fire is', probable: 'hot', improbable: 'wet' },
    { text: 'Milk comes from a', probable: 'cow', improbable: 'tree' },
    { text: 'The moon is', probable: 'round', improbable: 'triangular' }
  ],
  // Level 2: Still obvious
  [
    { text: 'A dog can', probable: 'bark', improbable: 'meow' },
    { text: 'A clock tells the', probable: 'time', improbable: 'weather' },
    { text: 'A pen is used to', probable: 'write', improbable: 'cook' },
    { text: 'A fork is used to', probable: 'eat', improbable: 'paint' },
    { text: 'A car has', probable: 'wheels', improbable: 'feathers' },
    { text: 'A bus carries', probable: 'passengers', improbable: 'clouds' },
    { text: 'A train runs on', probable: 'tracks', improbable: 'carpet' },
    { text: 'A boat floats on', probable: 'water', improbable: 'sand' },
    { text: 'A plane flies in the', probable: 'sky', improbable: 'basement' },
    { text: 'A bike has', probable: 'pedals', improbable: 'wings' }
  ],
  // Level 3: Simple real-world knowledge
  [
    { text: 'A sandwich can have', probable: 'bread', improbable: 'bricks' },
    { text: 'A train runs on', probable: 'tracks', improbable: 'carpet' },
    { text: 'A bee makes', probable: 'honey', improbable: 'plastic' },
    { text: 'A phone can', probable: 'ring', improbable: 'swim' },
    { text: 'A violin has', probable: 'strings', improbable: 'wheels' },
    { text: 'A piano has', probable: 'keys', improbable: 'feathers' },
    { text: 'A trumpet is', probable: 'loud', improbable: 'silent' },
    { text: 'A drum is', probable: 'hit', improbable: 'eaten' },
    { text: 'A flute is', probable: 'blown', improbable: 'thrown' },
    { text: 'A guitar is', probable: 'strummed', improbable: 'chewed' }
  ],
  // Level 4: Both plausible, one more natural
  [
    { text: 'He drank a glass of', probable: 'water', improbable: 'juice' },
    { text: 'She wore a', probable: 'dress', improbable: 'skirt' },
    { text: 'He read a', probable: 'book', improbable: 'magazine' },
    { text: 'They played a game of', probable: 'chess', improbable: 'checkers' },
    { text: 'She wrote a', probable: 'letter', improbable: 'note' },
    { text: 'He drove a', probable: 'car', improbable: 'truck' },
    { text: 'She made a cup of', probable: 'tea', improbable: 'coffee' },
    { text: 'He ate a bowl of', probable: 'cereal', improbable: 'soup' },
    { text: 'They watched a', probable: 'movie', improbable: 'show' },
    { text: 'He listened to', probable: 'music', improbable: 'radio' }
  ],
  // Level 5: Both correct, one more idiomatic
  [
    { text: 'She caught the', probable: 'bus', improbable: 'train' },
    { text: 'He took a', probable: 'shower', improbable: 'bath' },
    { text: 'She made the', probable: 'bed', improbable: 'breakfast' },
    { text: 'He set the', probable: 'table', improbable: 'alarm' },
    { text: 'She answered the', probable: 'phone', improbable: 'door' },
    { text: 'He closed the', probable: 'window', improbable: 'door' },
    { text: 'She turned on the', probable: 'light', improbable: 'fan' },
    { text: 'He opened the', probable: 'door', improbable: 'window' },
    { text: 'She washed the', probable: 'dishes', improbable: 'clothes' },
    { text: 'He folded the', probable: 'laundry', improbable: 'towels' }
  ],
  // Level 6: Both plausible, one more frequent
  [
    { text: 'He went to the', probable: 'store', improbable: 'market' },
    { text: 'She works at a', probable: 'hospital', improbable: 'clinic' },
    { text: 'He studies at the', probable: 'university', improbable: 'college' },
    { text: 'She lives in a', probable: 'house', improbable: 'apartment' },
    { text: 'He bought a', probable: 'car', improbable: 'motorcycle' },
    { text: 'She likes to', probable: 'read', improbable: 'write' },
    { text: 'He prefers', probable: 'coffee', improbable: 'tea' },
    { text: 'She ordered a', probable: 'pizza', improbable: 'burger' },
    { text: 'He wore a', probable: 'shirt', improbable: 'jacket' },
    { text: 'She found a', probable: 'job', improbable: 'career' }
  ],
  // Level 7: Both correct, subtle difference
  [
    { text: 'He made a', probable: 'mistake', improbable: 'decision' },
    { text: 'She gave a', probable: 'speech', improbable: 'presentation' },
    { text: 'He wrote a', probable: 'report', improbable: 'summary' },
    { text: 'She took a', probable: 'picture', improbable: 'photo' },
    { text: 'He played the', probable: 'guitar', improbable: 'piano' },
    { text: 'She drove to the', probable: 'office', improbable: 'work' },
    { text: 'He watched the', probable: 'news', improbable: 'weather' },
    { text: 'She read the', probable: 'newspaper', improbable: 'magazine' },
    { text: 'He cooked', probable: 'dinner', improbable: 'lunch' },
    { text: 'She cleaned the', probable: 'kitchen', improbable: 'bathroom' }
  ],
  // Level 8: Both plausible, very close
  [
    { text: 'He finished his', probable: 'work', improbable: 'task' },
    { text: 'She started a new', probable: 'project', improbable: 'job' },
    { text: 'He wrote an', probable: 'email', improbable: 'article' },
    { text: 'She made a', probable: 'call', improbable: 'visit' },
    { text: 'He took a', probable: 'break', improbable: 'rest' },
    { text: 'She gave a', probable: 'gift', improbable: 'card' },
    { text: 'He found a', probable: 'solution', improbable: 'result' },
    { text: 'She reached a', probable: 'goal', improbable: 'target' },
    { text: 'He made a', probable: 'choice', improbable: 'selection' },
    { text: 'She wrote a', probable: 'note', improbable: 'message' }
  ],
  // Level 9: Both correct, almost equally likely
  [
    { text: 'He opened the', probable: 'window', improbable: 'door' },
    { text: 'She closed the', probable: 'door', improbable: 'window' },
    { text: 'He took the', probable: 'bus', improbable: 'train' },
    { text: 'She made a', probable: 'decision', improbable: 'choice' },
    { text: 'He wrote a', probable: 'letter', improbable: 'email' },
    { text: 'She read a', probable: 'book', improbable: 'novel' },
    { text: 'He played a', probable: 'game', improbable: 'match' },
    { text: 'She cooked', probable: 'dinner', improbable: 'supper' },
    { text: 'He found a', probable: 'job', improbable: 'position' },
    { text: 'She gave a', probable: 'speech', improbable: 'talk' }
  ],
  // Level 10: Both correct, extremely subtle
  [
    { text: 'A programmer writes', probable: 'code', improbable: 'programs' },
    { text: 'She made a cup of', probable: 'tea', improbable: 'coffee' },
    { text: 'He took a', probable: 'photo', improbable: 'picture' },
    { text: 'She read the', probable: 'news', improbable: 'newspaper' },
    { text: 'He made a', probable: 'mistake', improbable: 'error' },
    { text: 'She gave a', probable: 'presentation', improbable: 'speech' },
    { text: 'He wrote a', probable: 'report', improbable: 'summary' },
    { text: 'She took a', probable: 'break', improbable: 'rest' },
    { text: 'He found an', probable: 'answer', improbable: 'explanation' },
    { text: 'She reached a', probable: 'goal', improbable: 'target' }
  ]
]; 