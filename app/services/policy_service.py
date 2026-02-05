"""
Policy Service - Responsible AI governance and compliance checks.
Implements keyword-based policy rules to detect potential violations.
"""

from typing import List, Tuple
import re
import structlog

logger = structlog.get_logger()


class PolicyService:
    """
    Service for enforcing responsible AI policies.
    Performs content checks to detect potential violations.
    """
    
    # Policy violation keywords and patterns
    # In production, this should be configurable and more sophisticated
    POLICY_RULES = {
        "pii_ssn": r"\b\d{3}-\d{2}-\d{4}\b",  # SSN pattern
        "pii_credit_card": r"\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b",  # Credit card
        "pii_email": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",  # Email
        "harmful_violence": ["violence", "harm", "attack", "kill"],
        "harmful_hate": ["hate", "discriminate", "racist", "sexist"],
        "sensitive_medical": ["diagnosis", "prescription", "medical advice"],
        "sensitive_legal": ["legal advice", "sue", "lawsuit"],
        "sensitive_financial": ["investment advice", "stock tip", "financial advice"],
    }
    
    @classmethod
    def check_policy(cls, text: str) -> Tuple[bool, List[str]]:
        """
        Check if text violates any policy rules.
        
        Args:
            text: Text to check for policy violations
            
        Returns:
            Tuple of (has_violation, list_of_violations)
        """
        violations = []
        
        # Check regex patterns (PII detection)
        for rule_name, pattern in cls.POLICY_RULES.items():
            if isinstance(pattern, str):  # Regex pattern
                if re.search(pattern, text, re.IGNORECASE):
                    violations.append(rule_name)
                    logger.warning(f"Policy violation detected: {rule_name}")
            
            elif isinstance(pattern, list):  # Keyword list
                for keyword in pattern:
                    if keyword.lower() in text.lower():
                        violations.append(f"{rule_name}:{keyword}")
                        logger.warning(f"Policy violation detected: {rule_name} - {keyword}")
        
        has_violation = len(violations) > 0
        
        if has_violation:
            logger.info(
                "Policy check completed with violations",
                violation_count=len(violations),
                violations=violations
            )
        else:
            logger.info("Policy check completed - no violations detected")
        
        return has_violation, violations
    
    @classmethod
    def check_prompt_and_response(cls, prompt: str, response: str) -> Tuple[bool, List[str]]:
        """
        Check both prompt and response for policy violations.
        
        Args:
            prompt: User's input prompt
            response: AI-generated response
            
        Returns:
            Tuple of (has_violation, list_of_violations)
        """
        # Check prompt
        prompt_violation, prompt_violations = cls.check_policy(prompt)
        
        # Check response
        response_violation, response_violations = cls.check_policy(response)
        
        # Combine violations
        all_violations = []
        if prompt_violations:
            all_violations.extend([f"prompt:{v}" for v in prompt_violations])
        if response_violations:
            all_violations.extend([f"response:{v}" for v in response_violations])
        
        has_violation = prompt_violation or response_violation
        
        return has_violation, all_violations


# Convenience function
def check_policy(prompt: str, response: str) -> Tuple[bool, List[str]]:
    """Check policy violations in prompt and response."""
    return PolicyService.check_prompt_and_response(prompt, response)
