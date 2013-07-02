/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.connect;

import java.util.Collection;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.web.SignInAdapter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.RequestAttributes;

/**
 *
 * @author JanieBear
 */
@Component
public class UserSignInAdapter implements SignInAdapter {

	@Resource
	private UserDetailsService principalUserDetailsService;
	@Resource
	private PersistentTokenBasedRememberMeServices rememberMeServices;

	@Override
	public String signIn(String userId, Connection<?> connection, NativeWebRequest request) {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		UserDetails userDetails = this.principalUserDetailsService.loadUserByUsername(userId);

		class ManualAuthenticationToken extends AbstractAuthenticationToken {

			private final UserDetails principal;

			public ManualAuthenticationToken(UserDetails principal, Collection<? extends GrantedAuthority> authorities) {
				super(authorities);
				this.principal = principal;
				this.setAuthenticated(true);
			}

			@Override
			public Object getCredentials() {
				return null;
			}

			@Override
			public Object getPrincipal() {
				return this.principal;
			}
		}

		Authentication authentication = new ManualAuthenticationToken(userDetails, userDetails.getAuthorities());
		this.rememberMeServices.loginSuccess(request.getNativeRequest(HttpServletRequest.class), request.getNativeResponse(HttpServletResponse.class), authentication);
		securityContext.setAuthentication(authentication);

		request.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext, RequestAttributes.SCOPE_SESSION);
		return "/dash";
	}
}