// SPDX-License-Identifier: MIT 
pragma solidity >=0.8.2 <0.9.0;


import "./SafeMath.sol";
contract Lending_borrowing {

    using SafeMath for uint256;

    // borrower
    struct Proposal {
        uint256 proposalId;
        address borrower;
        uint256 credit_score;
        string collateral_token;
        uint256 collateral_quantity; 
        string loan_token;
        uint256 loan_quantity;
        string final_time;
    }

    Proposal[] public proposals;
    Loan[] public loans;

    mapping (address => uint256) public borrowerToLoan;


    struct Loan {
        uint256 loanId;
        address lender_address;
        address borower_address;
        uint256 proposalId;
        uint256 credit_score;
        string collateral_token;
        uint256 collateral_quantity; 
        string loan_token;
        uint256 loan_quantity;
        string final_time;

    }

        function createProposal(
            uint256 credit_score,
            string collateral_token,
            uint256 collateral_quantity, 
            string loan_token,
            uint256 loan_quantity,
            string final_time
        ) public {
            //change loanAmount to amount?
            uint256 _proposalId = proposals.length;
            proposals.push(
                Proposal(
                    _proposalId,
                    msg.sender,
                    credit_score,
                    collateral_token,
                    collateral_quantity,
                    loan_token,
                    loan_quantity,
                    final_time
                )
            );

            proposalToBorrower[_proposalId] = msg.sender;
        }

        function acceptProposal(
            uint256 _proposalId,
            address borower_address,
            uint256 credit_score,
            string collateral_token,
            uint256 collateral_quantity, 
            string loan_token,
            uint256 loan_quantity,
            string final_time
            
        ) public {
            uint256 _loanId = loans.length;
            loans.push(
                Loan(
                    _loanId,
                    msg.sender,
                    borower_address,
                    _proposalId,
                    credit_score,
                    collateral_token,
                    collateral_quantity,
                    loan_token,
                    loan_quantity,
                    final_time
                )
            );
            loanToLender[_loanId] = msg.sender;
            proposals[_proposalId].borrower = 0x0;
            borrowerToLoan[borower_address] = _loanId; 


        }

    function repayLoan(
    ) public {
        
    }


    
}