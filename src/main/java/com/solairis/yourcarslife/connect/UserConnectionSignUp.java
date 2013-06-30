/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.connect;

import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.service.UserService;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.annotation.Resource;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionSignUp;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author JanieBear
 */
@Component
public class UserConnectionSignUp implements ConnectionSignUp {

	@Resource
	private UserService userService;
	@Resource
	private UsersConnectionRepository usersConnectionRepository;

	@Override
	@Transactional
	public String execute(Connection<?> connection) {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		Object user = securityContext.getAuthentication().getPrincipal();

		if (String.class.isAssignableFrom(user.getClass()) && user.equals("anonymousUser")) {
//			List<String> userIds = this.connectionService.getUserIds(connection.createData().getProviderId(), connection.createData().getProviderUserId());
			Set<String> userIds = this.usersConnectionRepository.findUserIdsConnectedTo(connection.createData().getProviderId(), new HashSet<String>(Arrays.asList(connection.createData().getProviderUserId())));

			if (userIds.isEmpty()) {
				// Create new user
				User u = new User();
				if (connection.fetchUserProfile().getUsername() != null) {
					User prevUser = this.userService.getUser(connection.fetchUserProfile().getUsername());
					u.setLogin(connection.fetchUserProfile().getUsername() + (prevUser == null ? "" : "-" + UUID.randomUUID().toString()));
				} else {
					u.setLogin("user-" + UUID.randomUUID().toString());
				}

				this.userService.createUser(u, null);
				return u.getLogin();
			} else if (userIds.size() == 1) {
				return userIds.iterator().next();
			} else {
				throw new IllegalArgumentException("Only 1 user Id may be associated with a provider. We found "+userIds.size());
			}
		} else {
			return ((UserDetails)user).getUsername();
		}
	}
}
