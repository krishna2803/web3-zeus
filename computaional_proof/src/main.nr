fn main(
    totalBorrowed : pub Field,
    totalRepaid : pub Field,
    openPositions : pub Field,
    closedPositions : pub Field,
    liquidationCount : pub Field
) -> pub Field{
    // Index 0 is for delta
    // Index 1 is for gamma
    // Index 2 is for lambda
    let weights= [ 3, 8, 1];
    
    let delta = ((totalRepaid - totalBorrowed)/totalRepaid)*1000;
    let gamma = closedPositions*1000/(openPositions+closedPositions);
    let lambda = liquidationCount * liquidationCount;

    let score: u256 = weights[1]*gamma - weights[0]*delta - weights[2]*lambda;

    if(score <=0) {
        score = score * (-1);
    }  
    score
}

#[test]
fn test_main() {
    let h1 = main(10000, 20000, 5000, 5000, 10);
    let score_calculated = 900;
    assert(score_calculated == h1);

}
