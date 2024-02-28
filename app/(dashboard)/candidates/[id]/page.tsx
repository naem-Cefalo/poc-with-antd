import React from 'react';

function CandidateIdPage({ params }: { params: { id: number } }) {
  return <div>CandidateIdPage {params.id}</div>;
}

export default CandidateIdPage;
