import React from 'react';

function CandidateIdPage({ params }: { params: { id: number | string } }) {
  return <div>CandidateIdPage {params.id}</div>;
}

export default CandidateIdPage;
