
// Symptom checker controller
exports.checkSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid array of symptoms'
      });
    }
    
    // Mock API response with conditions based on symptoms
    const conditionsList = {
      'headache': [
        { name: 'Tension Headache', probability: 0.7, severity: 'Mild', description: 'Common headache with mild to moderate pain' },
        { name: 'Migraine', probability: 0.4, severity: 'Moderate', description: 'Recurring headache with moderate to severe pain' },
        { name: 'Sinusitis', probability: 0.3, severity: 'Mild', description: 'Inflammation of the sinuses' }
      ],
      'fever': [
        { name: 'Common Cold', probability: 0.6, severity: 'Mild', description: 'Viral infection affecting the upper respiratory tract' },
        { name: 'Influenza', probability: 0.5, severity: 'Moderate', description: 'Viral infection that affects the respiratory system' },
        { name: 'COVID-19', probability: 0.4, severity: 'Moderate to Severe', description: 'Infectious disease caused by the SARS-CoV-2 virus' }
      ],
      'cough': [
        { name: 'Common Cold', probability: 0.7, severity: 'Mild', description: 'Viral infection affecting the upper respiratory tract' },
        { name: 'Bronchitis', probability: 0.4, severity: 'Moderate', description: 'Inflammation of the bronchial tubes' },
        { name: 'Pneumonia', probability: 0.3, severity: 'Severe', description: 'Infection that inflames air sacs in lungs' }
      ],
      'sore throat': [
        { name: 'Pharyngitis', probability: 0.8, severity: 'Mild', description: 'Inflammation of the pharynx' },
        { name: 'Tonsillitis', probability: 0.5, severity: 'Moderate', description: 'Inflammation of the tonsils' },
        { name: 'Strep Throat', probability: 0.4, severity: 'Moderate', description: 'Bacterial infection causing inflammation and pain in the throat' }
      ],
      'fatigue': [
        { name: 'Anemia', probability: 0.5, severity: 'Moderate', description: 'Decrease in red blood cells or hemoglobin' },
        { name: 'Depression', probability: 0.4, severity: 'Moderate', description: 'Mental health disorder characterized by persistently depressed mood' },
        { name: 'Chronic Fatigue Syndrome', probability: 0.3, severity: 'Moderate', description: 'Complex disorder characterized by extreme fatigue' }
      ],
      'nausea': [
        { name: 'Gastroenteritis', probability: 0.7, severity: 'Moderate', description: 'Inflammation of the gastrointestinal tract' },
        { name: 'Food Poisoning', probability: 0.6, severity: 'Moderate', description: 'Illness caused by eating contaminated food' },
        { name: 'Migraine', probability: 0.3, severity: 'Moderate', description: 'Recurring headache with moderate to severe pain' }
      ],
      'dizziness': [
        { name: 'Vertigo', probability: 0.6, severity: 'Moderate', description: 'Sensation of spinning or movement when there is none' },
        { name: 'Low Blood Pressure', probability: 0.5, severity: 'Mild to Moderate', description: 'Blood pressure that is lower than normal' },
        { name: 'Anemia', probability: 0.4, severity: 'Moderate', description: 'Decrease in red blood cells or hemoglobin' }
      ],
      'chest pain': [
        { name: 'Angina', probability: 0.6, severity: 'Moderate to Severe', description: 'Type of chest pain caused by reduced blood flow to the heart' },
        { name: 'Heart Attack', probability: 0.5, severity: 'Severe', description: 'Blockage of blood flow to the heart muscle' },
        { name: 'Gastroesophageal Reflux Disease', probability: 0.4, severity: 'Mild to Moderate', description: 'Digestive disorder affecting the LES' }
      ],
      'shortness of breath': [
        { name: 'Asthma', probability: 0.6, severity: 'Moderate', description: 'Condition in which airways narrow and swell' },
        { name: 'Chronic Obstructive Pulmonary Disease', probability: 0.5, severity: 'Moderate to Severe', description: 'Inflammatory lung disease' },
        { name: 'Pneumonia', probability: 0.4, severity: 'Severe', description: 'Infection that inflames air sacs in lungs' }
      ],
      'rash': [
        { name: 'Eczema', probability: 0.7, severity: 'Mild', description: 'Condition that makes skin red and itchy' },
        { name: 'Allergic Reaction', probability: 0.5, severity: 'Mild to Severe', description: 'Immune system response to a foreign substance' },
        { name: 'Psoriasis', probability: 0.4, severity: 'Moderate', description: 'Skin disease causing red, itchy scaly patches' }
      ]
    };
    
    const possibleConditions = [];
    const conditionsMap = new Map();
    
    // Process each symptom
    symptoms.forEach(symptom => {
      const normalizedSymptom = symptom.toLowerCase().trim();
      const matchedSymptom = Object.keys(conditionsList).find(key => 
        normalizedSymptom.includes(key) || key.includes(normalizedSymptom)
      );
      
      if (matchedSymptom) {
        conditionsList[matchedSymptom].forEach(condition => {
          if (conditionsMap.has(condition.name)) {
            const existingCondition = conditionsMap.get(condition.name);
            conditionsMap.set(condition.name, {
              ...condition,
              probability: Math.min(1, existingCondition.probability + 0.1)
            });
          } else {
            conditionsMap.set(condition.name, condition);
          }
        });
      }
    });
    
    // Convert map to array and sort by probability
    Array.from(conditionsMap.values())
      .sort((a, b) => b.probability - a.probability)
      .forEach(condition => {
        possibleConditions.push(condition);
      });
    
    res.status(200).json({
      success: true,
      data: {
        symptoms,
        possibleConditions: possibleConditions.length > 0 ? possibleConditions : [
          { name: 'No specific conditions found', probability: 0, severity: 'Unknown', description: 'Please consult with a healthcare professional for proper diagnosis.' }
        ]
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
